import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'carbon-components-react';
import './stream-footer.scss';

export default class StreamFooter extends Component {
  static hasScrolled() {
    return document.body.scrollTop > 0 || document.documentElement.scrollTop > 0;
  }

  static returnToTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Firefox, Chrome
  }

  button() {
    return (
      <Button
        className="button"
        kind="ghost"
        onClick={() => StreamFooter.returnToTop()}
        role="button"
        tabIndex={0}
      >
        Return to top
      </Button>
    );
  }

  render() {
    const { hasItems, streamType } = this.props;
    const streamTypes = new Map()
      .set('security', 'items')
      .set('investigation', 'Investigations')
      .set('request', 'Service Requests');
    const message = hasItems
      ? `No more ${streamTypes.get(streamType)} to display`
      : `No ${streamTypes.get(streamType)} to display`;
    return (
      <div className="stream-footer">
        <h3 className="message">{message}</h3>
        {StreamFooter.hasScrolled() ? this.button() : null}
      </div>
    );
  }
}

StreamFooter.propTypes = {
  hasItems: PropTypes.bool.isRequired,
  streamType: PropTypes.string.isRequired
};
