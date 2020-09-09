import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInvestigations, setInvestigation } from '../../../actions/investigations';
import ConditionalStreamRender from '../common/conditionalStreamRender/ConditionalStreamRender';
import FilterContainer from '../common/filterContainer/FilterContainer';
import StreamItem from '../common/streamItem/StreamItem';
import StreamView from '../common/streamView/StreamView';
import filterSchema from './filterSchema';
import './investigation-stream.scss';
import StreamHeader from '../common/streamHeader/StreamHeader';

export class InvestigationStream extends Component {
  fetchMoreData(filters, isInfiniteScroll, offset) {
    const { dispatch } = this.props;
    dispatch(getInvestigations(filters, isInfiniteScroll, offset));
  }

  render() {
    const {
      items,
      offset,
      hasMore,
      filters,
      filtersOpen,
      isFetching,
      isInfiniteScroll,
      dispatch,
      isFetchingExportData
    } = this.props;
    return (
      <>
        <StreamHeader
          title="Investigations"
          streamType="investigation"
          items={items}
          filters={filters}
          isFetchingExportData={isFetchingExportData}
        />
        <div className="investigation-stream" role="main" data-cy="investigationsStream">
          <ConditionalStreamRender
            condition={filtersOpen}
            firstChild={(
              <StreamView
                title="Investigations"
                streamType="investigation"
                loadMore={() => this.fetchMoreData(filters, true, offset)}
                hasMore={hasMore}
                isFetching={isFetching}
                isInfiniteScroll={isInfiniteScroll}
                isFetchingExportData={isFetchingExportData}
              >
                {items
                  .sort((a, b) => new Date(b.timeOfUpdate) - new Date(a.timeOfUpdate))
                  .map((leaf) => (
                    <StreamItem
                      item={leaf}
                      onClick={() => dispatch(setInvestigation(leaf))}
                      redirectTo={`investigations/${leaf.id}`}
                      key={leaf.id}
                    />
                  ))}
              </StreamView>
            )}
            secondChild={
              <FilterContainer streamType="investigation" filterSchema={filterSchema} callback={getInvestigations} />
            }
          />
        </div>
      </>
    );
  }
}

InvestigationStream.propTypes = {
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
  isInfiniteScroll: PropTypes.bool.isRequired,
  isFetchingExportData: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  items: state.investigations.items,
  filters: state.filters.investigation,
  filtersOpen: state.filters.isOpen.investigation,
  hasMore: state.investigations.hasMore,
  offset: state.investigations.offset,
  isFetching: state.investigations.isFetching,
  isInfiniteScroll: state.investigations.isInfiniteScroll,
  isFetchingExportData: state.investigations.isFetchingExportData
});

export default connect(mapStateToProps)(InvestigationStream);
