import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../header.scss';

const HeaderItem = ({ to, text }) => (
  <div className="header-item">
    <NavLink to={to} activeClassName="active">{text}</NavLink>
  </div>
);

HeaderItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default HeaderItem;
