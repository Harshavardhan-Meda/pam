import { Button, Link } from 'carbon-components-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlertCon from '../alertcon/AlertCon';
import shieldLogo from '../../assets/login/shield.png';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { loginInProgress: false };
  }

  render() {
    const { level } = this.props;
    const { loginInProgress } = this.state;

    return (
      <div className="login-form">
        <div className="title">
          <img src={shieldLogo} className="shield" alt="shield logo" />
          <div>IBM Security Services</div>
        </div>
        <a href={`${process.env.PUBLIC_URL}/api/login`}>
          <Button
            className="button"
            disabled={loginInProgress}
            onClick={() => {
              this.setState({
                loginInProgress: true
              });
            }}
          >
            Login with IBMid
          </Button>
        </a>

        <div className="link">
          <Link href="https://www.ibm.com/account/us-en/signup/register.html?a=ZGNlNzQwZmQtYTI3My00">Create IBMid</Link>
        </div>
        <AlertCon level={level} />
      </div>
    );
  }
}

LoginForm.propTypes = { level: PropTypes.string.isRequired };

const mapStateToProps = (state) => ({ level: state.alertCon.level });

export default connect(mapStateToProps)(LoginForm);
