/* eslint-disable import/prefer-default-export */
import ReactPiwik from 'react-piwik';

export const initMatomo = ({ email, customerContactId, customerId, customerName, userId, ibmIdUniqueId }) => {
  ReactPiwik.push(['setCustomVariable', 1, 'customerName', customerName]);
  ReactPiwik.push(['setCustomVariable', 2, 'email', email]);
  ReactPiwik.push(['setCustomVariable', 3, 'customerId', customerId]);
  ReactPiwik.push(['setCustomDimension', 1, customerContactId]);
  ReactPiwik.push(['setCustomDimension', 2, customerId]);
  ReactPiwik.push(['setCustomDimension', 3, customerName]);
  ReactPiwik.push(['setCustomDimension', 4, userId]);
  ReactPiwik.push(['setCustomDimension', 5, ibmIdUniqueId]);
};
