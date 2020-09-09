import '@carbon/ibm-security/css/index.min.css';
import 'carbon-components/scss/globals/scss/styles.scss';
import createBrowserHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import ReactPiwik from 'react-piwik';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import { responsiveStoreEnhancer } from 'redux-responsive';
import { devToolsEnhancer } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import './app.scss';
import AuthenticatedApp from './AuthenticatedApp';
import LoginApp from './components/login/LoginApp';
import reducers from './reducers';
import rootSaga from './sagas/rootSaga';

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

class App extends Component {
  constructor(props) {
    super(props);
    const sagaMiddleware = createSagaMiddleware();
    const middleWare = [sagaMiddleware];

    let allEnchancers = compose(responsiveStoreEnhancer, applyMiddleware(...middleWare));
    if (process.env.NODE_ENV === 'development') {
      middleWare.push(logger);
      allEnchancers = compose(allEnchancers, devToolsEnhancer());
    }

    this.store = createStore(reducers, allEnchancers);
    sagaMiddleware.run(rootSaga);

    if (process.env.NODE_ENV !== 'test') {
      const piwik = new ReactPiwik({
        url: process.env.REACT_APP_PIWIK_HOST || 'https://piwik.sec.ibm.com',
        siteId: process.env.REACT_APP_PIWIK_SITE_ID || 17,
        trackErrors: true
      });
      ReactPiwik.push(['trackPageView']);
      this.state = { piwik };
    }
  }

  getHistory() {
    if (process.env.NODE_ENV !== 'test') {
      const { piwik } = this.state;
      return piwik.connectToHistory(history);
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <Router history={this.getHistory()}>
          <Switch>
            <Route exact path="/login" component={LoginApp} />
            <AuthenticatedApp />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
