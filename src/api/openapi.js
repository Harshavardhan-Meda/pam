module.exports = {
  openapi: '3.0.1',
  info: {
    title: 'Web-BFF',
    version: '3.0.0'
  },
  servers: [{ url: `${process.env.PUBLIC_URL}/web/v1/api` }],
  paths: {
    '/alertCon': {
      get: {
        description: 'alertCon data',
        operationId: 'getAlertCon',
        responses: {
          200: {
            description: 'Success getAlertCon data',
            content: {
              'application/json': {
                schema: {
                  type: 'object'
                }
              }
            }
          }
        }
      },
      'x-swagger-router-controller': 'alertCon'
    },
    '/socAnnouncement': {
      get: {
        description: 'soc security data',
        operationId: 'getSocAnnouncement',
        responses: {
          200: {
            description: 'Success soc security data',
            content: {
              'application/json': {
                schema: {
                  type: 'object'
                }
              }
            }
          }
        }
      },
      'x-swagger-router-controller': 'soc'
    },
    '/stream': {
      get: {
        description: 'Returns items in the stream for a user',
        operationId: 'getStream',
        parameters: [{
          name: 'offset',
          in: 'query',
          description: 'Start point of data return',
          schema: {
            type: 'string'
          }
        }, {
          name: 'limit',
          in: 'query',
          description: 'Limit of data return',
          schema: {
            minimum: 1,
            type: 'integer',
            default: 20
          }
        }, {
          name: 'filters',
          in: 'query',
          description: 'JSON object which describes a set of filters',
          schema: {
            type: 'string'
          }
        }],
        responses: {
          200: {
            description: 'Response containing leaves in the stream and other useful data',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    hasMore: {
                      type: 'boolean'
                    },
                    offset: {
                      type: 'string'
                    },
                    newPosts: {
                      type: 'boolean'
                    },
                    items: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/streamItem'
                      }
                    }
                  }
                }
              }
            }
          },
          default: {
            description: 'Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        },
        security: [{
          Bearer: [],
          accessToken: []
        }]
      },
      'x-swagger-router-controller': 'stream'
    },
    '/interest': {
      get: {
        description: 'Gets list of inteterests for specified user',
        operationId: 'getInterest',
        parameters: [{
          name: 'leafId',
          in: 'query',
          description: 'ID of leaf to set interest',
          schema: {
            type: 'string'
          }
        }],
        responses: {
          200: {
            description: 'Response containing leaf id and interest status',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/interestResponse'
                }
              }
            }
          }
        },
        security: [{
          Bearer: [],
          accessToken: []
        }]
      },
      put: {
        description: 'Sets the interest status (true|false) for a pebble in the stream',
        operationId: 'setInterest',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/interestObj'
              }
            }
          },
          required: false
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/setInterestResponse'
                }
              }
            }
          },
          default: {
            description: 'Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        },
        security: [{
          Bearer: [],
          accessToken: []
        }],
        'x-codegen-request-body-name': 'interestObj'
      },
      'x-swagger-router-controller': 'stream'
    },
    '/interest/click': {
      put: {
        description: "Saves the user's click",
        operationId: 'setClick',
        requestBody: {
          description: "Object with leaf ID to set user's click",
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/setClick'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'Response containing leaf id and click status',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/setClickResponse'
                }
              }
            }
          },
          default: {
            description: 'Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        },
        security: [{
          Bearer: [],
          accessToken: []
        }],
        'x-codegen-request-body-name': 'clickObj'
      },
      'x-swagger-router-controller': 'stream'
    },
    '/interest/share': {
      put: {
        description: "Saves the user's share",
        operationId: 'setShare',
        requestBody: {
          description: "Object with leaf ID to set user's click",
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/setShare'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'Response containing leaf id and share status',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/setShareResponse'
                }
              }
            }
          },
          default: {
            description: 'Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        },
        security: [{
          Bearer: [],
          accessToken: []
        }],
        'x-codegen-request-body-name': 'shareObj'
      },
      'x-swagger-router-controller': 'stream'
    },
    '/investigations': {
      get: {
        description: 'Returns list of investigations',
        operationId: 'getInvestigations',
        parameters: [{
          name: 'offset',
          in: 'query',
          description: 'Start point of data return',
          schema: {
            minimum: 0,
            type: 'integer',
            default: 0
          }
        }, {
          name: 'limit',
          in: 'query',
          description: 'Limit of data return',
          schema: {
            minimum: 1,
            type: 'integer',
            default: 20
          }
        }, {
          name: 'filters',
          in: 'query',
          description: 'JSON object which describes a set of filters',
          schema: {
            type: 'string'
          }
        }],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    hasMore: {
                      type: 'boolean'
                    },
                    totalCount: {
                      type: 'number'
                    },
                    offset: {
                      type: 'number'
                    },
                    newPosts: {
                      type: 'boolean'
                    },
                    items: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/investigation'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        security: [{
          Bearer: [],
          accessToken: []
        }]
      },
      'x-swagger-router-controller': 'investigations'
    },
    '/investigations/{investigationId}': {
      get: {
        description: 'Returns specific investigation',
        operationId: 'getInvestigationById',
        parameters: [{
          name: 'investigationId',
          in: 'path',
          description: 'ID of investigation to return',
          required: true,
          schema: {
            type: 'string'
          }
        }],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/investigation'
                }
              }
            }
          }
        },
        security: [{
          Bearer: [],
          accessToken: []
        }]
      },
      'x-swagger-router-controller': 'investigations'
    },
    '/investigations/{id}/comments': {
      put: {
        description: 'Add a comment to the investigation',
        operationId: 'addInvestigationComment',
        parameters: [{
          name: 'id',
          in: 'path',
          description: 'ID of investigation to which the comment is added',
          required: true,
          schema: {
            type: 'string'
          }
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/comment'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/investigation'
                }
              }
            }
          },
          default: {
            description: 'Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        },
        security: [{
          Bearer: [],
          accessToken: []
        }],
        'x-codegen-request-body-name': 'comment'
      },
      'x-swagger-router-controller': 'investigations'
    },
    '/requests': {
      get: {
        description: 'Returns list of requests',
        operationId: 'getRequests',
        parameters: [{
          name: 'offset',
          in: 'query',
          description: 'Start point of data return',
          schema: {
            minimum: 0,
            type: 'integer',
            default: 0
          }
        }, {
          name: 'limit',
          in: 'query',
          description: 'Limit of data return',
          schema: {
            minimum: 1,
            type: 'integer',
            default: 20
          }
        }, {
          name: 'filters',
          in: 'query',
          description: 'JSON object which describes a set of filters',
          schema: {
            type: 'string'
          }
        }],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    hasMore: {
                      type: 'boolean'
                    },
                    totalCount: {
                      type: 'number'
                    },
                    offset: {
                      type: 'number'
                    },
                    newPosts: {
                      type: 'boolean'
                    },
                    items: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/request'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        security: [{
          Bearer: [],
          accessToken: []
        }]
      },
      'x-swagger-router-controller': 'requests'
    },
    '/requests/{requestId}': {
      get: {
        description: 'Returns specific request',
        operationId: 'getRequestById',
        parameters: [{
          name: 'requestId',
          in: 'path',
          description: 'ID of request to return',
          required: true,
          schema: {
            type: 'string'
          }
        }],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/request'
                }
              }
            }
          }
        },
        security: [{
          Bearer: [],
          accessToken: []
        }]
      },
      'x-swagger-router-controller': 'requests'
    },
    '/requests/{id}/comments': {
      put: {
        description: 'Add a comment to the request',
        operationId: 'addRequestComment',
        parameters: [{
          name: 'id',
          in: 'path',
          description: 'ID of request to which the comment is added',
          required: true,
          schema: {
            type: 'string'
          }
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/comment'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/request'
                }
              }
            }
          },
          default: {
            description: 'Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        },
        security: [{
          Bearer: [],
          accessToken: []
        }],
        'x-codegen-request-body-name': 'comment'
      },
      'x-swagger-router-controller': 'requests'
    },
    '/profile': {
      get: {
        description: 'Returns user profile data to the caller',
        operationId: 'getProfile',
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserProfile'
                }
              }
            }
          },
          default: {
            description: 'Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        },
        security: [{
          Bearer: [],
          accessToken: []
        }]
      },
      'x-swagger-router-controller': 'profile'
    },
    '/swagger': {
      'x-swagger-pipe': 'swagger_raw'
    },
    '/healthcheck': {
      get: {
        description: 'Get health status of bxtestms',
        operationId: 'health',
        responses: {
          200: {
            description: 'Health check response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/healthResponse'
                },
                example: {
                  status: 'UP'
                }
              }
            }
          }
        }
      },
      'x-swagger-router-controller': 'health'
    }
  },
  components: {
    schemas: {
      request: {
        type: 'object',
        properties: {
          type: {
            type: 'string'
          },
          title: {
            type: 'string'
          },
          subtitle: {
            type: 'string'
          },
          id: {
            type: 'string'
          },
          lastUpdate: {
            type: 'string'
          },
          timeOfUpdate: {
            type: 'string'
          },
          status: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          devices: {
            type: 'array',
            items: {
              type: 'object',
              properties: { }
            }
          },
          sharing: {
            type: 'object',
            properties: { }
          },
          worklog: {
            type: 'array',
            items: {
              type: 'object',
              properties: { }
            }
          }
        },
        description: 'Investigation detail'
      },
      investigation: {
        type: 'object',
        properties: {
          type: {
            type: 'string'
          },
          title: {
            type: 'string'
          },
          subtitle: {
            type: 'string'
          },
          id: {
            type: 'string'
          },
          lastUpdate: {
            type: 'string'
          },
          timeOfUpdate: {
            type: 'string'
          },
          status: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          priority: {
            type: 'string'
          },
          devices: {
            type: 'array',
            items: {
              type: 'object',
              properties: { }
            }
          },
          sharing: {
            type: 'object',
            properties: { }
          },
          worklog: {
            type: 'array',
            items: {
              type: 'object',
              properties: { }
            }
          }
        },
        description: 'Investigation detail'
      },
      comment: {
        type: 'object',
        properties: {
          text: {
            type: 'string'
          }
        },
        description: 'Object describing an investigation comment'
      },
      streamItem: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          author: {
            type: 'string'
          },
          create_datetime: {
            type: 'string'
          },
          epoch_datetime: {
            type: 'integer'
          },
          image: {
            type: 'string'
          },
          video: {
            type: 'object',
            properties: { }
          },
          tags: {
            type: 'array',
            items: {
              type: 'object',
              properties: { }
            }
          },
          date: {
            type: 'string'
          },
          followed: {
            type: 'boolean'
          },
          type: {
            type: 'string'
          },
          title: {
            type: 'string'
          },
          severity: {
            type: 'string'
          },
          subtitle: {
            type: 'string'
          },
          summary: {
            type: 'string'
          },
          sourceURI: {
            type: 'string'
          },
          sharing: {
            type: 'object',
            properties: { }
          }
        },
        description: 'Security Stream item'
      },
      interestObj: {
        required: ['interest', 'leafId'],
        type: 'object',
        properties: {
          leafId: {
            minLength: 1,
            type: 'string'
          },
          interest: {
            type: 'boolean'
          }
        },
        description: 'Change interest state for a pebble in the stream',
        example: {
          leafId: '2e3ad45sd67fhj90asd23',
          interest: true
        }
      },
      setClick: {
        required: ['leafId'],
        type: 'object',
        properties: {
          leafId: {
            type: 'string'
          }
        }
      },
      setShare: {
        required: ['leafId'],
        type: 'object',
        properties: {
          leafId: {
            type: 'string'
          }
        }
      },
      interestResponse: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                leafId: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      setInterestResponse: {
        type: 'object',
        properties: {
          leafId: {
            type: 'string'
          },
          interest: {
            type: 'boolean'
          }
        }
      },
      setClickResponse: {
        type: 'object',
        properties: {
          leafId: {
            type: 'string'
          },
          click: {
            type: 'boolean'
          }
        }
      },
      setShareResponse: {
        type: 'object',
        properties: {
          leafId: {
            type: 'string'
          },
          share: {
            type: 'boolean'
          }
        }
      },
      ErrorResponse: {
        required: ['message'],
        type: 'object',
        properties: {
          message: {
            type: 'string'
          }
        }
      },
      healthResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'string'
          }
        }
      },
      UserProfile: {
        type: 'object',
        properties: {
          ibmIdUniqueId: {
            type: 'string'
          },
          creation_date: {
            type: 'object',
            properties: {
              standard: {
                type: 'string'
              },
              epoch: {
                type: 'number'
              }
            }
          },
          customerName: {
            type: 'string'
          },
          customerId: {
            type: 'string'
          },
          firstName: {
            type: 'string'
          },
          lastName: {
            type: 'string'
          },
          displayName: {
            type: 'string'
          },
          email: {
            type: 'string'
          },
          country: {
            type: 'string'
          },
          customerContactId: {
            type: 'string'
          },
          marketing: {
            type: 'boolean',
            default: false
          }
        },
        description: 'User profile object'
      }
    },
    securitySchemes: {
      Bearer: {
        type: 'apiKey',
        description: 'valid JWT token must be provided.',
        name: 'Authorization',
        in: 'header'
      },
      accessToken: {
        type: 'apiKey',
        description: 'valid access token provided by client',
        name: 'X-Horizon-Access-Token',
        in: 'header'
      }
    }
  }
};
