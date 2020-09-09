import PropTypes from 'prop-types';
import React from 'react';
import CollapsiblePanel from '../collapsiblePanel/CollapsiblePanel';
import './evidence.scss';

const getDeviceCount = (devices) => {
  if (devices) {
    return devices.length;
  }
  return 0;
};

const getDevices = (devices) => {
  if (devices && devices.length > 0) {
    return (
      <ul className="devices">
        {devices.map((device) => (
          <li key={device.name}>{device.name}</li>
        ))}
      </ul>
    );
  }
};

const Evidence = ({ leaf }) => (
  <div className="evidences">
    <CollapsiblePanel label="Description" collapsed={false} piwikCategory="Evidences">
      <div className="description">{leaf.description}</div>
    </CollapsiblePanel>
    <CollapsiblePanel label="Devices" itemCount={getDeviceCount(leaf.devices)} piwikCategory="Evidences">
      {getDevices(leaf.devices)}
    </CollapsiblePanel>
  </div>
);

Evidence.propTypes = { leaf: PropTypes.node.isRequired };

export default Evidence;
