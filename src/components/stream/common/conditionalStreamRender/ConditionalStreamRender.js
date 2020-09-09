/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

/**
 * Renders two components conditionally based on browser viewport
 * If using a mobile device, it renders either firstChild or secondChild based on condition
 * If using a desktop device, it renders both firstChild and secondChild unconditionally
 *
 * This ensures that either the StreamView or Filters are rendered in mobile view, but renders both on desktop
 *
 * @param firstChild - React component
 * @param secondChild - React component
 * @param browser - `react-responsive` - passed down by Redux
 * @param condition - condition on which either firstChild or secondChild is rendered in mobileView
 *
 * Please note that the components are wrapped in <Fragment /> because of an issue with Enzyme
 * @look https://github.com/airbnb/enzyme/issues/1149
 */
export const ConditionalStreamRender = ({ firstChild, secondChild, browser, condition }) => (
  browser.lessThan.medium
    ? (condition ? secondChild : firstChild)
    : (
      <>
        {secondChild}
        {firstChild}
      </>
    )
);

ConditionalStreamRender.propTypes = {
  firstChild: PropTypes.node.isRequired,
  secondChild: PropTypes.node.isRequired,
  browser: PropTypes.shape({ lessThan: PropTypes.shape({ medium: PropTypes.bool.isRequired }) }).isRequired,
  condition: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({ browser: state.browser });

export default connect(mapStateToProps)(ConditionalStreamRender);
