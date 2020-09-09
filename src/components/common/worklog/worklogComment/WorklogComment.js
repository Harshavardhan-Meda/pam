/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './worklog-comment.scss';
import { ReactComponent as Flag } from '../../../../assets/common/flag_16.svg';
import PropTypes from 'prop-types';

class WorklogComment extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', close: false }; //close - isCloseBtnClicked/disabled

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
    this.handleTicketClose = this.handleTicketClose.bind(this);
    this.isSubmitDisabled = this.isSubmitDisabled.bind(this);
  }

  isSubmitDisabled() {
    const { value } = this.state;
    const { status } = this.props;
    return !value || !value.trim() || status === 'Closed';
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const { id, addComment, dispatch } = this.props;
    const { value } = this.state;
    event.preventDefault();
    dispatch(addComment(id, value));
    this.setState({ value: '' });
  }

  handleTicketClose() {
    const { id, addComment, dispatch } = this.props;
    dispatch(addComment(id, 'Please close this ticket.'));
    this.setState({ close: true });
  }

  onEnterPress(event) {
    if (this.isSubmitDisabled()) return;
    if (event.keyCode !== 13 || event.shiftKey) return;
    event.preventDefault();
    this.handleSubmit(event);
  }

  render() {
    const { value, close } = this.state;
    const { user, status } = this.props;
    return (
      <form className="worklog-comment" onSubmit={this.handleSubmit}>
        <div className="circle" />
        <label htmlFor="commentText" className="comment-label">
          {status === 'Pending' && (
            <div className="comment-header">
              Please respond to {user}
              <Flag className="flag" />
            </div>
          )}
          <textarea
            className="comment-text"
            data-cy="worklogComment-textarea"
            placeholder="Your comment"
            id="commentText"
            name="comment"
            value={value}
            onChange={this.handleChange}
            onKeyDown={this.onEnterPress}
          />
        </label>
        <div className="btn-group">
          <button
            type="submit"
            data-cy="worklogComment-submitButton"
            className="security--button bx--btn bx--btn--primary"
            disabled={this.isSubmitDisabled()}
          >
            Add comment
          </button>
          <button
            type="button"
            data-cy="worklogComment-closeButton"
            className="security--button bx--btn bx--btn--secondary"
            onClick={this.handleTicketClose}
            disabled={close || status === 'Closed'}
          >
            Close ticket
          </button>
        </div>
      </form>
    );
  }
}

WorklogComment.propTypes = {
  user: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired
};

export default connect()(WorklogComment);
