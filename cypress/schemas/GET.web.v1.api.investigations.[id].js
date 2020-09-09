// eslint-disable-next-line import/no-extraneous-dependencies
import { versionSchemas } from '@cypress/schema-tools';

const schema = {
  version: {
    major: 1,
    minor: 0,
    patch: 0
  },
  schema: {
    type: 'object',
    title: 'GET.web.v1.api.investigations.[id]',
    required: true,
    additionalProperties: false,
    properties: {
      type: {
        type: 'string',
        pattern: 'investigation'
      },
      title: {
        type: 'string',
        pattern: '^(.*)$'
      },
      priority: {
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
      status: {
        type: 'string',
        pattern: '^(.*)$'
      },
      timeOfUpdate: {
        type: 'string',
        pattern: '^(.*)$'
      },
      description: {
        type: 'string',
        pattern: '^(.*)'
      },
      devices: {
        type: 'array',
        items: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              pattern: '^(.*)$'
            }
          }
        }
      },
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
              pattern: '^(.*)'
            }
          }
        }
      }
    }
  }
};
export default versionSchemas(schema);
