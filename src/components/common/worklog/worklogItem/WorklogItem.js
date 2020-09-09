import PropTypes from 'prop-types';
import React from 'react';
import './worklog-item.scss';
import classNames from 'classnames';

const WorklogItem = ({ item, collapsed, last }) => {
  const { user, lastUpdate, text } = item;
  return (
    <div className={classNames('worklog-item', { 'worklog-collapsed': collapsed })}>
      <div className="circle" />
      <div className="worklog-container">
        <div className="worklog-inner-container">
          <span className="worklog-author">{user}</span>
          <span className="worklog-inner-text">commented</span>
          {last && <div className="worklog-new-label">NEW</div>}
        </div>
        <time>{lastUpdate}</time>
        <pre>{text}</pre>
      </div>
    </div>
  );
};

WorklogItem.propTypes = {
  collapsed: PropTypes.bool,
  last: PropTypes.bool,
  item: PropTypes.shape({
    user: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};

WorklogItem.defaultProps = {
  collapsed: null,
  last: false
};

export default WorklogItem;
