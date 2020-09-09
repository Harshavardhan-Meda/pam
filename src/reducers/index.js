import { combineReducers } from 'redux';
import { responsiveStateReducer as browser } from 'redux-responsive';
import alertCon from './alertCon';
import filters from './filters';
import investigations from './investigations';
import profile from './profile';
import requests from './requests';
import securityStream from './securityStream';
import socAnnouncement from './socAnnouncement';
import interest from './interest';
import preferences from './preferences';
import exportFeature from './exportFeature';

export default combineReducers({
  alertCon,
  investigations,
  requests,
  securityStream,
  socAnnouncement,
  filters,
  browser,
  profile,
  interest,
  preferences,
  exportFeature
});
