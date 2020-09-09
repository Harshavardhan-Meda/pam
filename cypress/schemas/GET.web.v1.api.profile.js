/* eslint-disable import/no-extraneous-dependencies */
import { versionSchemas } from '@cypress/schema-tools';

const schema = {
  version: {
    major: 1,
    minor: 0,
    patch: 0
  },
  schema: {
    title: 'GET.web.v1.api.profile',
    type: 'object',
    properties: {
      creationDate: {
        type: 'object',
        required: ['standard', 'epoch'],
        properties: {
          standard: {
            type: 'string',
            pattern: '^(.*)$'
          },
          epoch: {
            type: 'integer',
            default: 0
          }
        }
      },
      customerName: {
        type: 'string',
        pattern: '^(.*)$'
      },
      customerId: {
        type: 'string',
        pattern: '^(.*)$'
      },
      customerContactId: {
        type: 'string',
        pattern: '^(.*)$'
      },
      firstName: {
        type: 'string',
        pattern: '^(.*)$'
      },
      lastName: {
        type: 'string',
        pattern: '^(.*)$'
      },
      displayName: {
        type: 'string',
        pattern: '^(.*)$'
      },
      email: {
        type: 'string',
        pattern: '^(.*)$'
      },
      country: {
        type: 'string',
        pattern: '^(.*)$'
      },
      ibmIdUniqueId: {
        type: 'string',
        pattern: '^(.*)$'
      },
      marketing: {
        type: 'boolean'
      }
    },
    required: [
      'creationDate',
      'customerName',
      'customerId',
      'customerContactId',
      'firstName',
      'lastName',
      'displayName',
      'email',
      'country',
      'ibmIdUniqueId'
    ],
    additionalProperties: false
  }
};

export default versionSchemas(schema);
