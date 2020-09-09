/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSocAnnouncement } from '../../../actions/socAnnouncement';
import './security-announcement.scss';

export class SecurityAnnouncement extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.dispatch(getSocAnnouncement());
  }

  getDescription() {
    const { detailedDescription, message } = this.props;
    return detailedDescription || message;
  }

  render() {
    return (
      <div className="security-announcement">
        <div className="title">
          Security Announcement
        </div>
        <span
          className="description"
          dangerouslySetInnerHTML={{ __html: this.getDescription() }}
        />
      </div>
    );
  }
}

SecurityAnnouncement.propTypes = {
  detailedDescription: PropTypes.string,
  message: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

SecurityAnnouncement.defaultProps = {
  detailedDescription: '',
  message: ''
};

const mapStateToProps = (state) => ({
  detailedDescription: state.socAnnouncement.detailedDescription,
  message: state.socAnnouncement.message
});

export default connect(mapStateToProps)(SecurityAnnouncement);
