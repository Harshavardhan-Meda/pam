const express = require('express');
const fs = require('fs');
const https = require('https');
const helmet = require('helmet');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const proxy = require('http-proxy-middleware');
const logger = require('winston');
const transport = require('@horizon/logger');
const cookieParser = require('cookie-parser');
const MemoryStore = require('memorystore')(session);
const { ibmIdStrategy } = require('./passportConfig');
const appName = require('../package').name;

logger.add(transport(appName));

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(
  session({
    cookie: {
      domain: process.env.NODE_ENV === 'production' && '.sec.ibm.com',
      sameSite: 'lax'
    },
    store: new MemoryStore({
      checkPeriod: 14400000 // prune expired entries every 4h
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.PASSPORT_SESSION_SECRET
  })
);
app.use(passport.initialize());
app.use(passport.session());

const bffUrl = process.env.BFF_URL;
logger.info(`[server] initializing with ${bffUrl}`);

app.use(
  '/web',
  proxy({
    target: bffUrl,
    onProxyReq(proxyReq, req) {
      if (req.user) {
        proxyReq.setHeader('X-Horizon-Id-Token', req.user.idToken);
        proxyReq.setHeader('X-Horizon-Access-Token', req.user.accessToken);
      }
    },
    onProxyRes(proxyRes) {
      const env = process.env.NODE_ENV || 'development';
      if (env !== 'development') {
        proxyRes.headers['access-control-allow-origin'] = process.env.CORS_ALLOW_ORIGIN;
      } else {
        proxyRes.headers['access-control-allow-origin'] = '*';
      }
    },
    followRedirects: true,
    changeOrigin: true,
    logLevel: 'debug'
  })
);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((obj, done) => done(null, obj));

passport.use('openidconnect', ibmIdStrategy);

/**
 * if this request is proxied (ex. from Portal's Apache server), we need to set the host header to the
 * proxy URL after it reached our node/express server.  But the host header must be the Horizon URL
 * initially so IBM Cloud knows how to route the request to our application.
 */
function setProxyHost(req) {
  if (req.headers['x-forwarded-server']) {
    req.headers.host = req.headers['x-forwarded-server'];
  }
  return req;
}

app.get('/api/login', (req, res, next) => {
  setProxyHost(req);

  logger.info('[/login] request to authenticate using passport');
  if (req.query.redirect) {
    logger.info(`[/login] redirect requested after authentication to ${req.query.redirect}`);
    req.session.originalUrl = `${process.env.PUBLIC_URL || ''}/${req.query.redirect}`;
  }
  passport.authenticate('openidconnect', {
    state: Math.random().toString(36).substr(2, 10)
  })(req, res, next);
});

app.get('/api/login-callback', (req, res, next) => {
  setProxyHost(req);

  const streamUrl = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/stream` : '/stream';
  const redirectUrl = req.session.originalUrl || streamUrl;
  delete req.session.originalUrl;
  logger.info('[/login-callback] caling passport.authenticate');
  passport.authenticate('openidconnect', (err, user) => {
    if (err) {
      logger.error('[/login-callback] error during callback, redirecting to /login. Error: ', err);
      return res.redirect('/login');
    }
    if (!user) {
      logger.info('[/login-callback] authentication failed, redirecting to /login');
      return res.redirect('/login');
    }

    req.logIn(user, (error) => {
      if (error) {
        logger.error('[/login-callback] error during req.logIn, redirecting to /login. Error: ', error);
        return res.redirect('/login');
      }
      logger.info(`[/login-callback] authentication success, redirecting to ${redirectUrl}`);
      return res.redirect(redirectUrl);
    });
  })(req, res, next);
});

app.get('/api/logout', (req, res) => {
  logger.info('[/logout] request called to log user out');
  req.logOut();
  res.clearCookie('connect.sid');
  req.session.destroy(() => {
    res.redirect('/logout');
  });
});

function ensureAuthenticated(req, res, next) {
  logger.info(`[ensureAuthenticated] - resource: ${req.url}`);
  if (!req.isAuthenticated()) {
    logger.info('[ensureAuthenticated] - authenticated: false');
    const contextPath = process.env.PUBLIC_URL || '/';
    const loginPage = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/login` : '/login';
    logger.info(`[ensureAuthenticated] - context path: ${contextPath}`);
    logger.info(`[ensureAuthenticated] - req.originalUrl: ${req.originalUrl}`);
    req.session.originalUrl = path.join(contextPath, req.originalUrl);
    res.redirect(loginPage);
  } else {
    logger.info('[ensureAuthenticated] - authenticated: true');
    return next();
  }
}

app.get('/', ensureAuthenticated, (req, res) => {
  res.redirect(process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/stream` : '/stream');
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('/stream', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/logout', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'logout.html'));
});

app.get('/*', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const port = process.env.PORT || 8080;

// in development and test modes we need to start an HTTPS server to handle SSL,
// and in all other modes something sitting in front of our app handles SSL
const env = process.env.NODE_ENV || 'development';
if (env === 'development' || env === 'test') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  const options = {
    key: fs.readFileSync('./server/ssl/server.pem'),
    cert: fs.readFileSync('./server/ssl/server.pem')
  };
  https.createServer(options, app).listen(port, () => {
    logger.info(`Starting app on port ${port} in ${env} mode`);
  });
} else {
  logger.info(`Starting app on port ${port} in ${env} mode`);
  app.listen(port);
}
