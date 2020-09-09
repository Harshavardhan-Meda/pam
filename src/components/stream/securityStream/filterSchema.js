import { ReactComponent as Star } from '../../../assets/securityStream/securityStreamItem/securityInterest/star.svg';

export default [
  {
    name: 'type',
    label: 'Type',
    values: {
      news: 'News',
      investigation: 'Investigation',
      serviceRequest: 'Service Request',
      alert: 'Alert',
      assessment: 'Assessment'
    },
    multiSelect: true
  },
  {
    name: 'interest',
    title: 'Show Starred Items',
    values: { starred: 'Starred Items' },
    multiSelect: true,
    Icon: Star
  }
];
