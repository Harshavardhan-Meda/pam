import 'carbon-components/scss/globals/scss/styles.scss';

import React from 'react';
import LoginContent from './LoginContent';
import LoginForm from './LoginForm';

const LoginApp = () => (
  <div className="login-container" data-cy="loginContainer" role="main">
    <LoginContent />
    <LoginForm />
  </div>
);

export default LoginApp;
