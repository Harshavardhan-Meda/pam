import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as BackArrow } from '../../../assets/common/back_16.svg';
import { ReactComponent as RequestIcon } from '../../../assets/common/request.svg';
import { getPriority } from '../../../utils/leafUtils/leafUtils';
import DemoBanner from '../demoAlert/DemoBanner';
import Status from '../status/Status';
import './detailed-header.scss';
import ExportMenu from '../exportMenu/ExportMenu';

const streamName = {
  investigation: 'Investigations',
  request: 'Service Requests'
};

const DetailedHeader = ({ priority, status, lastUpdate, subtitle, title, streamType, id, displayDemoBanner, leaf }) => (
  <div className="detailed-header">
    <DemoBanner display={displayDemoBanner} />
    <div className="container">
      <div className={`priority priority-${getPriority(priority)}`}>
        {priority ? priority.toUpperCase() : <RequestIcon id="requestIcon" width={32} />}
      </div>
      <div className="header-content">
        <Link to={`/${streamType}s`} className="link">
          <div className="back" role="button" data-cy="ticketDetailsHeader-backButton" tabIndex={0}>
            <div className="arrow">
              <BackArrow />
            </div>
            {streamName[streamType] || ''}
          </div>
        </Link>
        <h3>
          {title}
          {subtitle && ` - ${subtitle}`}
        </h3>
        <h4>{id}</h4>
      </div>
      <Status lastUpdate={lastUpdate} status={status} />
    </div>
    {id && (
      <div className="export-content">
        <ExportMenu isDetailsExport="header" leaf={leaf} />
      </div>
    )}
  </div>
);

DetailedHeader.propTypes = {
  priority: PropTypes.string,
  status: PropTypes.string.isRequired,
  lastUpdate: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  id: PropTypes.string,
  streamType: PropTypes.oneOf(['investigation', 'request']).isRequired,
  displayDemoBanner: PropTypes.bool.isRequired,
  leaf: PropTypes.arrayOf(PropTypes.object).isRequired
};

DetailedHeader.defaultProps = {
  title: '',
  subtitle: '',
  priority: '',
  id: ''
};

export default DetailedHeader;
