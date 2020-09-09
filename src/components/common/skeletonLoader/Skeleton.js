import React from 'react';
import { SkeletonText } from 'carbon-components-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './skeleton.scss';

export const Text = ({ children, loading, lines, className, styles }) => (
  loading ? (
    <SkeletonText
      style={{ styles }}
      className={classNames('skeleton', className)}
      paragraph
      lineCount={lines}
    />
  ) : children
);

Text.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  lines: PropTypes.number,
  className: PropTypes.string,
  styles: PropTypes.shape
};

Text.defaultProps = {
  className: {},
  children: null,
  loading: false,
  lines: 1,
  styles: {}
};

export const SkeletonWorklog = ({ children, loading }) => (
  loading ? (
    <div className="skeleton-worklog">
      <Text loading={loading} className="skeleton-title-1" />
      <Text loading={loading} className="skeleton-subtitle-1" />
      <Text loading={loading} lines={4} />
      <Text loading={loading} className="skeleton-title-2" />
      <Text loading={loading} className="skeleton-subtitle-2" />
      <Text loading={loading} lines={4} />
      <Text loading={loading} className="skeleton-comment" />
      <div className="skeleton-buttons">
        <Text loading={loading} className="skeleton-button" />
        <Text loading={loading} className="skeleton-button" />
      </div>
    </div>
  ) : children
);

SkeletonWorklog.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool
};

SkeletonWorklog.defaultProps = {
  children: null,
  loading: false
};
