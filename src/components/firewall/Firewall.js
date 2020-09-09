import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './firewall.scss';
import StreamHeader from '../stream/common/streamHeader/StreamHeader';
import FooterButton from './common/FooterButton';
import SideBar from './common/SideBar';
import Next from './requestSteps/Next';
import RequestMethod from './requestSteps/RequestMethod';

export default class Firewall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'isFirst'
    };
    this.setPage = this.setPage.bind(this);
  }

  setPage(e) {
    this.setState({
      page: e.currentTarget.value
    });
  }

  render() {
    const style = { marginLeft: '600px' };
    const { page } = this.state;
      return (
        <>
          <StreamHeader title="Create New Request" subTitle="Firewall" streamType="new-ticket" />
          <div className="row">
            <div className="column side">
              <SideBar radioClass="radioClass" setPage={this.setPage} />
            </div>
            <div className="column middle">
              {page === 'isFirst' ?
                <RequestMethod /> : <Next />}
              <FooterButton class="firewall-cancel" value="Cancel" />
              <FooterButton class="firewall-next" margin={style} value="Next" />
            </div>
          </div>
        </>
      );
    }
}

Firewall.propTypes = {
  location: PropTypes.shape({ search: PropTypes.func.isRequired }).isRequired
};
