import React from 'react';
import CurrentTime from './currentTime/CurrentTime';
import './login.scss';
import SecurityAnnouncement from './securityAnnouncement/SecurityAnnouncement';

const LoginContent = () => (
  <div className="login-content">
    <CurrentTime />
    <SecurityAnnouncement />
  </div>
);

export default LoginContent;
