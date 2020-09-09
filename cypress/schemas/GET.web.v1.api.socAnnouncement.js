/* eslint-disable import/no-extraneous-dependencies */
import { versionSchemas } from '@cypress/schema-tools';

const schema = {
  version: {
    major: 1,
    minor: 0,
    patch: 0
  },
  schema: {
    title: 'GET.web.v1.api.socAnnouncement',
    type: 'object',
    properties: {
      id: { type: 'string' },
      shortDescription: { type: 'string' },
      detailedDescription: { type: 'string' }
    },
    required: true,
    additionalProperties: false
  }
};

export default versionSchemas(schema);
