import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './stream-header.scss';
import MediaQuery from 'react-responsive';
import moment from 'moment';
import { Button } from '@carbon/ibm-security';
import ToggleFiltersButton from './toggleFilters/ToggleFiltersButton';
import { ReactComponent as AddIcon } from '../../../../assets/common/add.svg';
import ExportMenu from '../../../common/exportMenu/ExportMenu';

const StreamHeader = ({ title, streamType, displayTime, exportData, items, pageName }) => (
  <>
    <div className="stream-header" data-cy="streamHeader">
      <div className="title-content">
        {streamType === 'new-ticket' && (
          <>
            <NavLink className="menu-item" to="/stream">
              Home
            </NavLink>{' '}
            /
            <NavLink className="menu-item" to="/requests">
              {' '}
              Your requests
            </NavLink>{' '}
            / <span>{title}</span>
            <h1>{title}</h1>
          </>
        )}
        {streamType === 'new-request' && (
          <>
            <NavLink className="menu-item" to="/stream">
              Home
            </NavLink>{' '}
            /
            <NavLink className="menu-item" to="/requests">
              {' '}
              Your requests
            </NavLink>{' '}
            /
            <NavLink className="menu-item" to="/new-ticket?type=request">
              {' '}
              Your requests
            </NavLink>{' '}
            / <span>{title}</span>
            <h1>{pageName}</h1>
          </>
        )}
      </div>

      {exportData === 'export' && <div className="create-new">{items.length > 0 && <ExportMenu />}</div>}

      {streamType === 'request' && (
        <Button
          className="create-new"
          disabled={false}
          iconDescription="Button icon"
          kind="primary"
          size="default"
          tabIndex={0}
          type="button"
        >
          <NavLink to={`/new-ticket?type=${streamType}`} className="create-new-link">
            <span className="desktop">Create New</span>
            <span className="mobile">
              <AddIcon />
            </span>
          </NavLink>
        </Button>
      )}
      <MediaQuery maxWidth={768}>{streamType !== 'new-ticket' && <ToggleFiltersButton type={streamType} />}</MediaQuery>
    </div>
    {displayTime && (
      <div className="stream-time" data-cy="streamTime">
        {moment().format('dddd, MMMM D')}
      </div>
    )}
  </>
);

StreamHeader.propTypes = {
  title: PropTypes.string.isRequired,
  streamType: PropTypes.string.isRequired,
  displayTime: PropTypes.bool,
  exportData: PropTypes.string.isRequired,
  pageName:PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      length: PropTypes.string.isRequired
    })
  ).isRequired,
  filters: PropTypes.shape({
    priority: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    timeframe: PropTypes.shape({ start: PropTypes.string })
  }).isRequired
};

export default StreamHeader;

StreamHeader.defaultProps = { displayTime: false };
