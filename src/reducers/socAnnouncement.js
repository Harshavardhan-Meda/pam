import {
  GET_SOC_ANNOUNCEMENT_FAILED,
  GET_SOC_ANNOUNCEMENT_SUCCESS
} from '../actionTypes/socAnnouncement';

const defaultSocAnnouncement = '<p>At the present time, all services are actively being delivered from our '
  + 'Global Security Operations Centers. All systems within the Security Operations Centers are '
  + 'operating under normal conditions.</p><p>Currently, there are not any Internet Emergencies.  '
  + 'In the event of an Internet Emergency, a status update will be provided at this URL, and '
  + 'Managed Security Services customers will be notified accordingly</p>';

export const initialState = {
  detailedDescription: defaultSocAnnouncement,
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SOC_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        detailedDescription: action.detailedDescription
      };
    case GET_SOC_ANNOUNCEMENT_FAILED:
      return { ...state, error: action.error };
    default:
      return { ...state };
  }
};

export default reducer;
