import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import WorklogItem from './worklogItem/WorklogItem';
import WorklogComment from './worklogComment/WorklogComment';
import './worklog.scss';

class Worklog extends Component {
  constructor(props) {
    super(props);
    this.state = { isCollapsed: true };
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onKeyPress(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.expand();
    }
  }

  expand() {
    this.setState({ isCollapsed: false });
  }

  scrollToBottom() {
    this.worklogEnd.scrollIntoView({ behavior: 'smooth' });
  }

  printItems(i, idx) {
    const { items } = this.props;
    const { isCollapsed } = this.state;
    if (idx === 0) {
      return (
        <>
          <WorklogItem item={i} />
          {items.length > 2 && (
            <div
              role="button"
              tabIndex={0}
              onKeyDown={(e) => this.onKeyPress(e)}
              onClick={() => this.expand()}
              className={classNames('prev', { 'prev-collapsed': !isCollapsed })}
              data-cy="worklog-expandCommentsButton"
            >
              {Array(3).fill(<div className="circle" />)}
              <span>See previous {items.length - 2} worklog entries</span>
            </div>
          )}
        </>
      );
    }
    if (idx === items.length - 1) {
      return <WorklogItem item={i} last />;
    }
    return <WorklogItem item={i} collapsed={isCollapsed} />;
  }

  render() {
    const { items, id, addComment, status } = this.props;
    const lastUser = items.length > 0 ? items[items.length - 1].user : null;
    return (
      <>
        <div className="worklog">
          {items ? items.map((i, idx) => this.printItems(i, idx)) : null}
        </div>
        <WorklogComment
          user={lastUser}
          id={id}
          addComment={addComment}
          status={status}
        />
        <div ref={(el) => { this.worklogEnd = el; }} />
      </>
    );
  }
}

Worklog.propTypes = {
  id: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.string
  }))
};


Worklog.defaultProps = { items: [] };

export default Worklog;
