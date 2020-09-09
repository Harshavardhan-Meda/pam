import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'carbon-components-react';
import './portalBannerContent.scss';
import { ReactComponent as CloseIcon } from '../../../assets/common/close.svg';
import watsonLogo from '../../../assets/portalBanner/watson_logo.png';
import bannerArrow from '../../../assets/portalBanner/banner_arrow.png';

const PortalBannerContent = ({ firstName, customerContactId, customerId, close }) => (
  <div className="bx--grid-full-width portalBanner">
    <div className="portalBanner__leftContainer">
      <img src={watsonLogo} className="portalBanner__watsonLogo" alt="" />
      <div className="portalBanner__text-background">
        <img
          src={bannerArrow}
          className="portalBanner__text-background__bannerArrow"
          alt=""
        />
        <div className="portalBanner__text-background__text">
          {firstName}, we’d love your feedback!
        </div>
      </div>
      <a
        href={`https://www.surveymonkey.com/r/MTXQ3BC?customerContactID=${customerContactId}&customerID=${customerId}`}
        rel="noopener noreferrer"
        target="_blank"
        className="portalBanner__button-survey bx--btn bx--btn--sm"
      >
        Take the survey
      </a>
    </div>
    <div className="portalBanner__rightContainer">
      <a
        href="https://portal.sec.ibm.com/mss/ssoRedirect.mss"
        className="portalBanner__button-back bx--btn bx--btn--sm bx--btn--ghost"
      >
        Back to Classic Portal version
      </a>
      <Button
        className="portalBanner__closeBanner bx--btn--sm"
        kind="ghost"
        onClick={close}
        data-cy="portalBanner-closeButton"
      >
        <CloseIcon />
      </Button>
    </div>
  </div>
);

PortalBannerContent.propTypes = {
  close: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  customerContactId: PropTypes.string,
  customerId: PropTypes.string
};

PortalBannerContent.defaultProps = {
  firstName: '',
  customerContactId: '',
  customerId: ''
};

export default PortalBannerContent;
