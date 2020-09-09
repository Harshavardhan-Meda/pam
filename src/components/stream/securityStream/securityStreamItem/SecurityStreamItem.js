import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import Clipboard from '../../../../../node_modules/react-clipboard.js/dist/react-clipboard';
import { ReactComponent as ImageEmail } from '../../../../assets/common/email_bright_16.svg';
import { ReactComponent as ImageCopy } from '../../../../assets/common/copy_bright_16.svg';
import { getLeafType } from '../../../../utils/leafUtils/leafUtils';
import Priority from '../../../common/priority/Priority';
import StreamActions from '../streamActions/StreamActions';
import StreamInterest from '../streamInterest/StreamInterest';
import ItemContent from '../itemContent/ItemContent';
import './security-stream-item.scss';

export default class SecurityStreamItem extends Component {
  getActionItems(item) {
    return [
      <Clipboard component="a" href="#" data-clipboard-text={item.sharing.url}>
        <span className="copy-to-clipboard">
          <ImageCopy className="image" />
          Copy URL to clipboard
        </span>
      </Clipboard>,
      <a href={`mailto:?body=${item.sharing.url}`} tabIndex={-1}>
        <ImageEmail className="image" />
        Send by email
      </a>
    ];
  }

  render() {
    const { item } = this.props;

    return (
      <Priority priority={item.priority} className="security-stream-item">
        <h2 className={classNames('stream-item-header', `icon-${getLeafType(item.type)}`)}>{_.upperCase(item.type)}
          <time>{moment(item.date).fromNow()}</time>
        </h2>
        <ItemContent
          title={item.title}
          data={item.summary}
          type={item.type}
          image={item.image}
          video={item.video}
          author={item.author}
          link={item.sharing.url}
        />
        <div className="actions-container">
          <StreamInterest leafId={item.id} />
          { item.sharing.url
          && <StreamActions key={item.identifier} components={this.getActionItems(item)} />}
        </div>
      </Priority>
    );
  }
}

SecurityStreamItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    priority: PropTypes.string,
    type: PropTypes.string,
    create_datetime: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    sharing: PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string
    }),
    summary: PropTypes.string,
    image: PropTypes.string,
    video: PropTypes.shape({
      url: PropTypes.string,
      content_type: PropTypes.string,
      bitrate: PropTypes.string
    }),
    date: PropTypes.string,
    sourceURI: PropTypes.string,
    author: PropTypes.string,
    link: PropTypes.string,
    epoch_datetime: PropTypes.number,
    identifier: PropTypes.string
  }).isRequired
};
