import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import PortalBannerContent from './PortalBannerContent';
import { showBanner, hideBanner } from '../../../actions/preferences';

export class PortalBanner extends Component {
  static getDerivedStateFromProps(props) {
    const url = props.location.search;
    const params = qs.parse(url, { ignoreQueryPrefix: true });
    for (const param in params) {
      if (!props.isBannerVisible && param === 'origin' && params[param] === 'portal') {
        props.dispatch(showBanner());
      }
    }
  }

  closeBanner() {
    const { dispatch } = this.props;
    dispatch(hideBanner());
  }

  render() {
    const { isBannerVisible, firstName, customerContactId, customerId } = this.props;
    return (
      isBannerVisible
      && (
        <PortalBannerContent
          firstName={firstName}
          customerContactId={customerContactId}
          customerId={customerId}
          close={() => this.closeBanner()}
        />
      )
    );
  }
}

PortalBanner.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isBannerVisible: PropTypes.bool,
  firstName: PropTypes.string,
  customerContactId: PropTypes.string,
  customerId: PropTypes.string,
  location: PropTypes.string
};

PortalBanner.defaultProps = {
  firstName: '',
  customerContactId: '',
  customerId: '',
  isBannerVisible: false,
  location: ''
};

export const mapStateToProps = (state) => ({
  isBannerVisible: state.preferences.isBannerVisible,
  firstName: state.profile.profile.firstName,
  customerContactId: state.profile.profile.customerContactId,
  customerId: state.profile.profile.customerId
});

export const ConnectedPortalBanner = connect(mapStateToProps)(PortalBanner);

export default withRouter(ConnectedPortalBanner);
