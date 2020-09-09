/* eslint-disable import/no-extraneous-dependencies */
import { combineSchemas, bind } from '@cypress/schema-tools';
import GETWebV1ApiAlertCon from './GET.web.v1.api.alertCon';
import GETWebV1ApiSocAnnouncement from './GET.web.v1.api.socAnnouncement';
import GETWebV1ApiStream from './GET.web.v1.api.stream';
import GETWebV1ApiRequests from './GET.web.v1.api.requests';
import GETWebV1ApiInvestigations from './GET.web.v1.api.investigations';
import GETWebV1ApiInterest from './GET.web.v1.api.interest';
import GETWebV1ApiProfile from './GET.web.v1.api.profile';
import GETWebV1ApiRequestsId from './GET.web.v1.api.requests.[id]';
import GETWebV1ApiInvestigationsId from './GET.web.v1.api.investigations.[id]';

const schemas = combineSchemas(
  GETWebV1ApiAlertCon,
  GETWebV1ApiSocAnnouncement,
  GETWebV1ApiStream,
  GETWebV1ApiRequests,
  GETWebV1ApiInvestigations,
  GETWebV1ApiInterest,
  GETWebV1ApiRequestsId,
  GETWebV1ApiInvestigationsId,
  GETWebV1ApiProfile
);
const api = bind({ schemas });

export default api;
