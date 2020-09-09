import { Loading } from 'carbon-components-react';
import PropTypes from 'prop-types';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import InfiniteScroll from 'react-infinite-scroller';
import './streamView.scss';
import StreamFooter from '../streamFooter/StreamFooter';

const StreamView = ({ title, children, streamType, loadMore, hasMore, isFetching, isInfiniteScroll }) => (
  <>
    <div className="stream-view" data-cy="streamView">
      {isFetching && !isInfiniteScroll ? (
        <Loading className="spinner" withOverlay={false} data-cy="spinner" />
    ) : (
      <>
        <InfiniteScroll
          pageStart={0}
          /**
          * @see https://github.com/CassetteRocks/react-infinite-scroller/issues/143
          * Passing a noop function to `loadMore` when already fetching
          * The above issue suggests passing `false` as `hasMore` prop instead,
          * but then we can't get the loading spinner to render properly
          */
          loadMore={isFetching ? () => {} : loadMore}
          hasMore={hasMore}
          loader={(
            <div className="spinner-container">
              {isFetching && (
                <Loading
                  className="spinner"
                  data-cy="spinner"
                  withOverlay={false}
                  key={`Spinner_${title}_${new Date().getTime()}`}
                />
              )}
            </div>
            )}
        >{children}
        </InfiniteScroll>
        { (!isFetching && !hasMore) && <StreamFooter hasItems={!isEmpty(children)} streamType={streamType} />}
      </>
    )}
    </div>
  </>
);

StreamView.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  streamType: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isInfiniteScroll: PropTypes.bool.isRequired
};

export default StreamView;
