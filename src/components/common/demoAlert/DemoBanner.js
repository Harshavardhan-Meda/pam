import PropTypes from 'prop-types';
import React from 'react';
import './demoBanner.scss';
import { InlineNotification } from 'carbon-components-react';

const DemoBanner = ({ display }) => (
  <>
    {display && (
      <InlineNotification
        title=""
        kind="warning"
        role="alert"
        subtitle={(
          <span>You have been logged with a demo account and you are viewing generated
            <b> sample data </b>
            used for demonstration.
          </span>
        )}
      />
    )}
  </>
);

DemoBanner.propTypes = { display: PropTypes.bool.isRequired };

export default DemoBanner;
