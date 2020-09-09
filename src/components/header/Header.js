import React, { useState } from 'react';
import './header.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderItem from './headerItem/HeaderItem';
import HeaderProfile from './HeaderProfile';

export const Header = ({ firstName, lastName, email, customerContactId }) => {
  const [hidden, setHidden] = useState(false);
  return (
    <div className="header">
      <div className="text"><span>IBM</span> Security Services</div>
      <div className="header-items" role="navigation" aria-label="Top menu">
        <HeaderItem text="Security Stream" to="/stream" />
        <HeaderItem text="Investigations" to="/investigations" />
        <HeaderItem text="Your Requests" to="/requests" />
      </div>
      <button
        onClick={() => setHidden(!hidden)}
        type="button"
        aria-label="Toggle profile"
        className="security--button--icon security--header__button"
      >
        <span className="security--profile-image">{firstName[0]}{lastName[0]}</span>
      </button>
      <HeaderProfile
        hidden={hidden}
        setHidden={setHidden}
        firstName={firstName}
        lastName={lastName}
        email={email}
        customerContactId={customerContactId}
      />
    </div>
  );
};

Header.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  customerContactId: PropTypes.string.isRequired
};

export const mapStateToProps = (state) => ({
  firstName: state.profile.profile.firstName,
  lastName: state.profile.profile.lastName,
  email: state.profile.profile.email,
  customerContactId: state.profile.profile.customerContactId,
  isBannerVisible: state.preferences.isBannerVisible
});

export default connect(mapStateToProps)(Header);
