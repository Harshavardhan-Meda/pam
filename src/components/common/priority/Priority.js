import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './priority.scss';

const priorities = ['high', 'medium', 'low'];
const defaultOption = 'none';
const getPriority = (item) => (priorities.indexOf(item) !== -1 ? item : defaultOption);

const Priority = ({ priority, className, children }) => (
  <div className={classNames(className, 'priority', `priority-${getPriority(priority)}`)}>
    {children}
  </div>
);

Priority.propTypes = {
  priority: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Priority.defaultProps = {
  priority: 'none',
  className: ''
};

export default Priority;
