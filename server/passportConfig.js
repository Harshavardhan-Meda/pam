// TODO: check if https://apps.na.collabserv.com/forums/html/topic?id=de32f886-89cc-46bf-82af-f1cb175338ee was fixed
// and go back to using original passport-ci-oidc
const { IDaaSOIDCStrategy } = require('@horizon/passport-ci-oidc');

const ibmIdStrategy = new IDaaSOIDCStrategy(
  {
    discoveryURL: `${process.env.ISSUER}/.well-known/openid-configuration`,
    clientID: process.env.IBM_ID_CLIENT_ID,
    scope: 'openid',
    response_type: 'code',
    clientSecret: process.env.IBM_ID_CLIENT_SECRET,
    callbackURL: `${process.env.PUBLIC_URL || ''}/api/login-callback`,
    skipUserProfile: true,
    addCACert: true,
    /**
     * This certificate has been downloaded from https://ibm.biz/choosing_a_sso_provider
     * (JWK Certificates to validate id_token)
     */
    CACertPathList: ['/server/ssl/login.ibm.com.crt']
  },
  (iss, sub, profile, accessToken, refreshToken, params, done) => {
    process.nextTick(() => {
      profile.idToken = params.id_token;
      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;
      done(null, profile);
    });
  }
);

module.exports = { ibmIdStrategy };
