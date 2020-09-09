import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './status.scss';

const mapStatus = (source) => {
  if (source === 'Pending') {
    return 'Your Action Required';
  }
  return source;
};

const Status = ({ className, status, lastUpdate, timeOfUpdate }) => (
  <div className={classNames('statusContainer', className)}>
    <div className={classNames({ flag: status === 'Pending' })} />
    <div className="status">{mapStatus(status)}</div>
    <div className="lastUpdate" data-raw-date={timeOfUpdate}>{lastUpdate}</div>
  </div>
);

Status.propTypes = {
  className: PropTypes.string,
  lastUpdate: PropTypes.string.isRequired,
  status: PropTypes.string,
  timeOfUpdate: PropTypes.string.isRequired
};

Status.defaultProps = {
  status: '',
  className: ''
};

export default Status;
