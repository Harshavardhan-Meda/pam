import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSecurityStream } from '../../../actions/securityStream';
import { getInterest } from '../../../actions/interest';
import ConditionalStreamRender from '../common/conditionalStreamRender/ConditionalStreamRender';
import FilterContainer from '../common/filterContainer/FilterContainer';
import StreamView from '../common/streamView/StreamView';
import filterSchema from './filterSchema';
import './security-stream.scss';
import SecurityStreamItem from './securityStreamItem/SecurityStreamItem';
import StreamHeader from '../common/streamHeader/StreamHeader';


export class SecurityStream extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getInterest());
  }

  fetchMoreData(filters, isInfiniteScroll, offset) {
    const { dispatch } = this.props;
    dispatch(getSecurityStream(filters, isInfiniteScroll, offset));
  }

  render() {
    const { items, offset, hasMore, filters, filtersOpen, isFetching, isInfiniteScroll } = this.props;
    return (
      <>
        <StreamHeader title="Security Stream" streamType="security" displayTime />
        <div className="security-stream" role="main" data-cy="securityStream">
          <ConditionalStreamRender
            condition={filtersOpen}
            firstChild={(
              <StreamView
                title="Security Stream"
                streamType="security"
                loadMore={() => this.fetchMoreData(filters, true, offset)}
                hasMore={hasMore}
                isFetching={isFetching}
                isInfiniteScroll={isInfiniteScroll}
              >{items.map((leaf) => (<SecurityStreamItem item={leaf} key={leaf.id} />))}
              </StreamView>
          )}
            secondChild={(
              <FilterContainer
                streamType="security"
                filterSchema={filterSchema}
                callback={getSecurityStream}
              />
          )}
          />
        </div>
      </>
    );
  }
}

SecurityStream.propTypes = {
  filters: PropTypes
    .shape({ type: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]) }).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  offset: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  filtersOpen: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isInfiniteScroll: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  items: state.securityStream.items,
  filters: state.filters.security,
  hasMore: state.securityStream.hasMore,
  offset: state.securityStream.offset,
  filtersOpen: state.filters.isOpen.security,
  isFetching: state.securityStream.isFetching,
  isInfiniteScroll: state.securityStream.isInfiniteScroll
});

export default connect(mapStateToProps)(SecurityStream);
