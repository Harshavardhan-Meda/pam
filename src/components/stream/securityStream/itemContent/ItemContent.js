/* eslint-disable jsx-a11y/media-has-caption */
import classNames from 'classnames';
import Interweave from 'interweave';
import { HashtagMatcher, UrlMatcher } from 'interweave-autolink';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getImageUrl } from '../../../../utils/leafUtils/leafUtils';
import CustomMatcher from './CustomMatcher';
import './item-content.scss';

class ItemContent extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.vidRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.controlVideo = this.controlVideo.bind(this);
  }

  handleClick(event) {
    event.stopPropagation();
  }

  redirectTo() {
    const { link } = this.props;
    window.open(link, '_blank');
  }

  handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.redirectTo();
    }
  }

  controlVideo(e) {
    e.stopPropagation();
    const video = this.vidRef.current;
    // eslint-disable-next-line
    video.paused ? video.play() : video.pause();
  }

  addDefaultSrc(e, type) {
    e.target.src = getImageUrl(null, type);
  }

  render() {
    const { title, data, type, author, image, link, video } = this.props;
    return (
      <div
        tabIndex="0"
        role="link"
        className="content"
        data-cy="securityItemContent"
        title={link}
        onKeyDown={(e) => this.handleKeyDown(e)}
        onClick={() => this.redirectTo()}
      >
        {video ? (
          <video
            preload="auto"
            poster={getImageUrl(image, type)}
            src={video.url}
            type={video.content_type}
            loop
            autoPlay
            playsInline
            onClick={(e) => this.controlVideo(e)}
            ref={this.vidRef}
          />
        ) : (
          <img onError={(e) => this.addDefaultSrc(e, type)} src={getImageUrl(image, type)} alt="Item" />
        )}
        <div className="data">
          <h3 className={classNames('title', { 'title-light': !data })} ref={this.title}>
            <Interweave
              content={title && title.replace(/(\w+:|^)\/\//g, '')}
              newWindow
              tagName="div"
              hashtagUrl="https://twitter.com/hashtag/{{hashtag}}"
              onClick={this.handleClick}
              matchers={[new UrlMatcher('url'), new HashtagMatcher('hashtag'), new CustomMatcher('tagMatcher')]}
            />
          </h3>
          {author ? <span className="author">{author}</span> : null}
          <p className="description">{data}</p>
        </div>
      </div>
    );
  }
}

ItemContent.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  author: PropTypes.string,
  image: PropTypes.string,
  video: PropTypes.shape({
    url: PropTypes.string,
    content_type: PropTypes.string,
    bitrate: PropTypes.string
  }),
  link: PropTypes.string
};

ItemContent.defaultProps = {
  image: null,
  author: null,
  link: null,
  video: null
};

export default ItemContent;
