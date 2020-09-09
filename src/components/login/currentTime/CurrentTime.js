import moment from 'moment';
import React, { Component } from 'react';
import './current-time.scss';

class CurrentTime extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { now: new Date() };

    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    this.updateTime();
  }

  componentWillUnmount() {
    try {
      clearTimeout(this.nextUpdateTimeCall);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('error cancelling time update', e);
    }
  }

  updateTime() {
    this.setState({ now: new Date() });
    this.nextUpdateTimeCall = setTimeout(this.updateTime, 1000);
  }

  render() {
    const { now } = this.state;
    return (
      <div className="time">
        {moment(now).format('LT')}
      </div>
    );
  }
}

export default CurrentTime;
