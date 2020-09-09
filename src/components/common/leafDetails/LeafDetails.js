import { Tab, Tabs } from 'carbon-components-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DetailedHeader from '../detailedHeader/DetailedHeader';
import Evidence from '../evidence/Evidence';
import * as Skeleton from '../skeletonLoader/Skeleton';
import '../tab/tab.scss';
import Worklog from '../worklog/Worklog';
import './leaf-details.scss';

export class LeafDetails extends Component {
  componentDidMount() {
    const { getItemById, match } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.dispatch(getItemById(match.params.id));
  }

  render() {
    const { leaf, addCommentById, isFetching, customerName } = this.props;
    const { id, lastUpdate, priority, status, title, subtitle, devices, type, worklog } = leaf;
    const displaySkeleton = !id && isFetching;
    return (
      <div className="details" data-cy="ticketDetails" role="main">
        <DetailedHeader
          priority={priority}
          status={status}
          lastUpdate={(
            <Skeleton.Text loading={displaySkeleton} className="skeleton-update">
              {lastUpdate}
            </Skeleton.Text>
          )}
          title={(
            <Skeleton.Text loading={displaySkeleton} className="skeleton-title">
              {title}
            </Skeleton.Text>
          )}
          subtitle={subtitle}
          id={(
            <Skeleton.Text loading={displaySkeleton} className="skeleton-id">
              {id}
            </Skeleton.Text>
          )}
          streamType={type}
          displayDemoBanner={!customerName}
          leaf={leaf}
        />
        <div className="tabs">
          <Tabs>
            <Tab
              label={`Timeline (${(worklog && worklog.length) || 0})`}
              data-cy="ticketDetailsHeader-timelineTabButton"
            >
              <div className="tab-content">
                <Skeleton.SkeletonWorklog loading={displaySkeleton}>
                  <Worklog items={worklog.slice().reverse()} id={id} addComment={addCommentById} status={status} />
                </Skeleton.SkeletonWorklog>
              </div>
            </Tab>
            <Tab
              label={`Details (${(devices && devices.length + 1) || 0})`}
              data-cy="ticketDetailsHeader-detailsTabButton"
            >
              <div className="tab-content">
                <Evidence leaf={leaf} />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

LeafDetails.propTypes = {
  getItemById: PropTypes.func.isRequired,
  addCommentById: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    id: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string })
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  leaf: PropTypes.shape({
    id: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    description: PropTypes.string,
    worklog: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.string.isRequired,
        lastUpdate: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })
    ),
    type: PropTypes.string.isRequired,
    devices: PropTypes.arrayOf(PropTypes.shape({ length: PropTypes.number }))
  }).isRequired,
  customerName: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  leaf: state[`${ownProps.type}s`][ownProps.type],
  isFetching: state[`${ownProps.type}s`].isFetching,
  customerName: state.profile.profile.customerName
});

export default withRouter(connect(mapStateToProps)(LeafDetails));
