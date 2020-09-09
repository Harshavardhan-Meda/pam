/* eslint-disable import/no-extraneous-dependencies */
import { versionSchemas } from '@cypress/schema-tools';

const schema = {
  version: {
    major: 1,
    minor: 0,
    patch: 0
  },
  schema: {
    type: 'object',
    title: 'GET.web.v1.api.interest',
    properties: {
      items: {
        type: 'array',
        items: {
          type: 'object',
          required: ['leafId', 'interest'],
          properties: {
            leafId: {
              type: 'string',
              pattern: '^(.*)$'
            },
            interest: {
              type: 'boolean',
              examples: [true]
            }
          }
        }
      }
    },
    required: true,
    additionalProperties: false
  }
};

export default versionSchemas(schema);
