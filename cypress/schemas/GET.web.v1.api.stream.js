/* eslint-disable import/no-extraneous-dependencies */
import { versionSchemas } from '@cypress/schema-tools';

const schema = {
  version: {
    major: 1,
    minor: 0,
    patch: 0
  },
  schema: {
    title: 'GET.web.v1.api.stream',
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: {
          type: 'object',
          required: ['date', 'type', 'title', 'summary', 'sharing', 'id'],
          properties: {
            date: {
              type: 'string',
              pattern: '^(.*)$'
            },
            image: {
              type: 'string',
              pattern: '^(.*)$'
            },
            author: {
              type: 'string',
              pattern: '^(.*)$'
            },
            type: {
              type: 'string',
              pattern: '^(.*)$'
            },
            title: {
              type: 'string',
              pattern: '^(.*)$'
            },
            summary: {
              type: 'string',
              pattern: '^(.*)$'
            },
            sourceURI: {
              type: 'string',
              pattern: '^(.*)$'
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
            id: {
              type: 'string',
              pattern: '^(.*)$'
            }
          }
        }
      },
      hasMore: {
        type: 'boolean',
        default: false
      },
      offset: {
        type: 'string',
        pattern: '^(.*)$'
      },
      newPosts: {
        type: 'boolean',
        default: false
      }
    },
    required: true,
    additionalProperties: false
  }
};

export default versionSchemas(schema);
