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
    title: 'GET.web.v1.api.requests',
    properties: {
      hasMore: { type: 'boolean' },
      offset: { type: 'integer' },
      items: {
        type: 'array',
        items: {
          type: 'object',
          required: [
            'type',
            'title',
            'subtitle',
            'id',
            'lastUpdate',
            'timeOfUpdate',
            'status',
            'description',
            'devices',
            'sharing',
            'worklog'
          ],
          properties: {
            type: {
              type: 'string',
              pattern: 'request'
            },
            title: {
              type: 'string',
              pattern: '^(.*)$'
            },
            subtitle: {
              type: 'string',
              pattern: '^(.*)$'
            },
            id: {
              type: 'string',
              pattern: '^(.*)$'
            },
            lastUpdate: {
              type: 'string',
              pattern: '^(.*)$'
            },
            timeOfUpdate: {
              type: 'string',
              pattern: '^(.*)$'
            },
            status: {
              type: 'string',
              pattern: '^(.*)$'
            },
            description: {
              type: 'string',
              pattern: '^(.*)'
            },
            priority: {
              type: 'string',
              pattern: '^(.*)$'
            },
            devices: { type: 'array' },
            sharing: {
              type: 'object',
              required: ['url', 'title'],
              properties: {
                url: {
                  type: 'string',
                  pattern: '^(.*)$'
                },
                title: {
                  type: 'string',
                  pattern: '^(.*)$'
                }
              }
            },
            worklog: {
              type: 'array',
              items: {
                type: 'object',
                required: ['user', 'lastUpdate', 'text'],
                properties: {
                  user: {
                    type: 'string',
                    pattern: '^(.*)$'
                  },
                  lastUpdate: {
                    type: 'string',
                    pattern: '^(.*)$'
                  },
                  text: {
                    type: 'string',
                    pattern: '(.*)'
                  }
                }
              }
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
