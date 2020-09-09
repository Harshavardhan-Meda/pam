import React from 'react';
import PropTypes from 'prop-types';

const FooterButton = ({ value, margin }) => {
  return <input type="button" className="cancelButton" style={margin} value={value} />;
};
FooterButton.propTypes = {
  value: PropTypes.string.isRequired,
  margin: PropTypes.shape({ margin: PropTypes.object.isRequired }).isRequired
};
export default FooterButton;
