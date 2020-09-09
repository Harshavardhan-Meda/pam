export default [
  {
    name: 'status',
    label: 'Status',
    values:
      {
        pending: 'Your Action Required',
        new: 'New',
        assigned: 'Assigned',
        workInProgress: 'Work In Progress',
        resolved: 'Resolved',
        closed: 'Closed'
      },
    multiSelect: true
  },
  {
    name: 'timeframe',
    label: 'Timeframe',
    values: {
      LAST_24H: 'Past 24 Hours',
      LAST_7D: 'Past Week',
      LAST_3M: 'Past 3 Months'
    },
    multiSelect: false
  }
];
