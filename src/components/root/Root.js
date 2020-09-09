import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import DemoBanner from '../common/demoAlert/DemoBanner';
import Menu from '../menu/Menu';
import Header from '../header/Header';

const checkIfNotOnSecurityStreamScreen = (location) => location.pathname.substr(1) !== 'stream';

export const Root = ({ children, customerName, location }) => (
  <div>
    {checkIfNotOnSecurityStreamScreen(location) && <DemoBanner display={!customerName} />}
    <div>
      <Header />
      <Menu displayDemoBanner={!customerName} />
      {children}
    </div>
  </div>
);

Root.propTypes = {
  children: PropTypes.node.isRequired,
  customerName: PropTypes.string.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired
};

const mapStateToProps = (state) => ({ customerName: state.profile.profile.customerName });

export default connect(mapStateToProps)(Root);
