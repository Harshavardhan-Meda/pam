/* eslint-disable max-len */
export default {
  request: [
    {
      sectionTitle: 'Policy Change Requests',
      sectionDescription: 'Changes covered by your SLA. Resolution can take even less then 2 hours.',
      data: [
        {
          title: 'Firewall',
          description: 'Allow or block connections.',
          url: 'https://portal.sec.ibm.com/mss/ticket/firewallTicket.mss',
          path:'/new-ticket?type=request'
        },
        {
          title: 'IDS Signature',
          description: 'Modify signatures.',
          url: 'https://portal.sec.ibm.com/mss/ticket/idsPolicyChange.mss',
          path:'/new-ticket?type=request'
        },
        {
          title: 'IPS',
          description: 'Host/Network - block or add to White List.',
          url: 'https://portal.sec.ibm.com/mss/ticket/hostNetworkBlockWhiteList.mss',
          path:'/new-ticket?type=request'
        },
        {
          title: 'Endpoint',
          description: 'Manage malware detection.',
          url: 'https://portal.sec.ibm.com/mss/ticket/endpointPolicyTicket.mss',
          path:'/new-ticket?type=request'
        },
        {
          title: 'Other (covered by SLA)',
          description: 'Not related with previously specified requests. E.g. NAT modifications, VPN configurations etc.',
          url: 'https://portal.sec.ibm.com/mss/ticket/endpointPolicyTicket.mss',
          path:'/new-ticket?type=request'
          
        },
       
      ]
    },
    {
      sectionTitle: 'Submit Security Incident',
      sectionDescription: 'Choose type of incident',
      data: [
        {
          title: 'VPN/Connectivity',
          description: 'Report connectivity issue.',
          url: 'https://portal.sec.ibm.com/mss/ticket/vpnAndConnectivityNetwork.mss',
          path:'/new-ticket?type=request'
         
        },
        {
          title: 'Compromised Host/Network',
          description: 'Report a security breach.',
          url: 'https://portal.sec.ibm.com/mss/ticket/compromisedHostNetwork.mss',
          path:'/new-ticket?type=request'
         
        }
      ]
    },
    {
      sectionTitle: 'Service Requests',
      sectionDescription: 'Changes not covered by your SLA. Resolutions can take up to 2 weeks. Additional charges apply. Please verify with your contract.',
      data: [
        {
          title: 'Request not covered by SLA',
          description: 'Report expected outage, configure devices, request scans or software upgrade etc.',
          url: 'https://portal.sec.ibm.com/mss/ticket/serviceRequestSubmit.mss',
          path:'/new-ticket?type=request'
          
        },
        {
          title: 'MSIEM',
          description: 'Create or modify MSIEM rules.',
          url: 'https://portal.sec.ibm.com/mss/ticket/msiemPolicyTicket.mss',
         path:'/new-ticket?type=request'
        },
        {
          title: 'Privileged Access Management',
          description: 'Request change to PAM service',
          //  url: 'https://portal.sec.ibm.com/mss/ticket/generalPolicyTicket.mss',
          path:'/new-request'
          
        }
      ]
    }
  ]
};
