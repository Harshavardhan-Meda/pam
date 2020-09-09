/*
Licensed Materials - Property of IBM
* (c) Copyright IBM Corporation 2018. All Rights Reserved.
*/
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'carbon-components-react';
import { ReactComponent as Star } from '../../../../assets/securityStream/securityStreamItem/securityInterest/star.svg';
import './stream-interest.scss';
import { setInterest } from '../../../../actions/interest';

export class StreamInterest extends Component {
  constructor(props) {
    super(props);
    this.state = { interest: false };
  }

  componentDidMount() {
    const { leafId, items } = this.props;
    const interestedObj = items.find((i) => i.leafId === leafId);
    if (interestedObj) this.setState({ interest: true });
  }

  toggleInterestState() {
    const { leafId, dispatch } = this.props;
    const { interest } = this.state;
    dispatch(setInterest({ leafId, interest: !interest }));
    this.setState((prevState) => ({ interest: !prevState.interest }));
  }

  render() {
    const { interest } = this.state;
    const { leafId } = this.props;
    return (
      <div className="stream-interest">
        <Button
          kind="ghost"
          id={leafId}
          data-cy="streamItem-interestButton"
          className={interest ? 'interested' : 'not-interest'}
          onClick={() => this.toggleInterestState()}
        ><Star className="image" />
        </Button>
      </div>
    );
  }
}

StreamInterest.propTypes = {
  dispatch: PropTypes.func.isRequired,
  leafId: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    leafId: PropTypes.string.isRequired,
    interest: PropTypes.bool
  })).isRequired
};

const mapStateToProps = (state) => ({
  items: state.interest.items,
  isFetching: state.interest.isFetching
});

export default connect(mapStateToProps)(StreamInterest);
