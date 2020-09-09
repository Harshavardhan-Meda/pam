import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRequests, setRequest } from '../../../actions/requests';
import ConditionalStreamRender from '../common/conditionalStreamRender/ConditionalStreamRender';
import StreamItem from '../common/streamItem/StreamItem';
import FilterContainer from '../common/filterContainer/FilterContainer';
import filterSchema from './filterSchema';
import StreamView from '../common/streamView/StreamView';
import './request-stream.scss';
import StreamHeader from '../common/streamHeader/StreamHeader';

export class RequestStream extends Component {
  fetchMoreData(filters, isInfiniteScroll, offset) {
    const { dispatch } = this.props;
    dispatch(getRequests(filters, isInfiniteScroll, offset));
  }

  render() {
    const { items, offset, hasMore, filters, filtersOpen, isFetching, isInfiniteScroll, dispatch } = this.props;
    return (
      <>
        <StreamHeader title="Your Requests" streamType="request" items={items} filters={filters} />
        <div className="request-stream" role="main" data-cy="requestsStream">
          <ConditionalStreamRender
            condition={filtersOpen}
            firstChild={(
              <StreamView
                title="Your Requests"
                streamType="request"
                loadMore={() => this.fetchMoreData(filters, true, offset)}
                hasMore={hasMore}
                isFetching={isFetching}
                isInfiniteScroll={isInfiniteScroll}
              >
                {items
                  .sort((a, b) => new Date(b.timeOfUpdate) - new Date(a.timeOfUpdate))
                  .map((leaf) => (
                    <StreamItem
                      item={leaf}
                      onClick={() => dispatch(setRequest(leaf))}
                      redirectTo={`requests/${leaf.id}`}
                      key={leaf.id}
                    />
                  ))}
              </StreamView>
            )}
            secondChild={<FilterContainer streamType="request" filterSchema={filterSchema} callback={getRequests} />}
          />
        </div>
      </>
    );
  }
}

RequestStream.propTypes = {
  filters: PropTypes.shape({
    priority: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    timeframe: PropTypes.shape({ start: PropTypes.string })
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  offset: PropTypes.number.isRequired,
  hasMore: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  filtersOpen: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isInfiniteScroll: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  items: state.requests.items,
  filters: state.filters.request,
  hasMore: state.requests.hasMore,
  offset: state.requests.offset,
  filtersOpen: state.filters.isOpen.request,
  isFetching: state.requests.isFetching,
  isInfiniteScroll: state.requests.isInfiniteScroll
});

export default connect(mapStateToProps)(RequestStream);
