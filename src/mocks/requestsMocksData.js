module.exports = [
  {
    type: 'request',
    title: 'Customer Reported Incident',
    subtitle: 'Security Incident',
    id: 'SOCP00700659235',
    lastUpdate: 'Updated 5 days ago',
    status: 'Pending',
    description: 'This is an automation test ticket.',
    priority: 'medium',
    devices: [{ name: 'aix-soc-qa' }],
    sharing: {
      url: 'https://portal.mss.iss.net/mss/ticket/securityTicketUpdate.mss?ticketId=SOCP00700659235',
      title: 'CRI_SECURITY_INCIDENT'
    },
    worklog: [{
      user: 'qatest',
      lastUpdate: 'Updated 5 days ago',
      text: 'Ticket submitted via MSS Portal by user QA Test User [qatest]'
    }]
  },
  {
    type: 'request',
    title: 'Customer Reported Incident',
    subtitle: 'Security Incident',
    id: 'SOCP00700173973',
    lastUpdate: 'Updated 3 weeks ago',
    status: 'New',
    description: 'This is an automation test ticket.',
    priority: 'medium',
    devices: [{ name: 'aix-soc-qa' }],
    sharing: {
      url: 'https://portal.mss.iss.net/mss/ticket/securityTicketUpdate.mss?ticketId=SOCP00700173973',
      title: 'CRI_SECURITY_INCIDENT'
    },
    worklog: [{
      user: 'qatest',
      lastUpdate: 'Updated 2 weeks ago',
      text: 'some worklog text goes here'
    }]
  }
];
