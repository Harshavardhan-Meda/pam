import PropTypes from 'prop-types';
import React from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import Priority from '../../../common/priority/Priority';
import Status from '../../../common/status/Status';
import './stream-item.scss';

const getWorklog = (item, mobile) => {
  const count = item.worklog.length;
  if (mobile || count === 0) {
    return `${count} Comments`;
  }

  return `${count} Comments, last by ${item.worklog[0].user}: ${item.worklog[0].text}`;
};

const StreamItem = ({ item, redirectTo, onClick }) => (
  <Link to={redirectTo} onClick={onClick}>
    <Priority priority={item.priority} className="stream-item">
      <div className="left">
        <h2>{item.subtitle ? `${item.title} - ${item.subtitle}` : item.title}</h2>
        <div>{item.id}</div>
        <MediaQuery maxWidth={768} values={window.testMediaQueryValues}>
          {(matches) => <div className="comment">{getWorklog(item, matches)}</div>}
        </MediaQuery>
      </div>
      <Status className="right" lastUpdate={item.lastUpdate} timeOfUpdate={item.timeOfUpdate} status={item.status} />
    </Priority>
  </Link>
);

StreamItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    timeOfUpdate: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    devices: PropTypes.arrayOf(PropTypes.object),
    worklog: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  redirectTo: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default StreamItem;
