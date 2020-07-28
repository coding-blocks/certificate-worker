module.exports = {
  GET: {
    querystring: {
      q: {
        type: 'string'
      },
      offset: {
        type: 'number'
      },
      limit: {
        type: 'number'
      }
    }
  },
  GETById: {
    response: {
      404: {
        type: 'object',
        properties: {
          message: { 
            type: 'string' 
          }
        }
      }
    }
  },
  UPDATE: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        params: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        content: {
          type: 'string'
        },
        height: {
          type: 'number'
        },
        width: {
          type: 'number'
        }
      }
    },
    response: {
      '2xx': {
        type: 'object',
        properties: {
          value: {
            type: 'object',
            properties: {
              _id: {
                type: 'string'
              },
              name: {
                type: 'string'
              },
              params: {
                type: 'array',
                items: {
                  type: 'string'
                }
              },
              content: {
                type: 'string'
              },
              height: {
                type: 'number'
              },
              width: {
                type: 'number'
              }
            }
          }
        }
      }
    }
  },
  CREATE: {
    body: {
      type: 'object',
      required: ['name', 'params', 'content'],
      properties: {
        name: {
          type: 'string'
        },
        params: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        content: {
          type: 'string'
        },
        height: {
          type: 'number'
        },
        width: {
          type: 'number'
        }
      }
    },
    response: {
      '2xx': {
        type: 'object',
        properties: {
          value: {
            type: 'object',
            properties: {
              _id: {
                type: 'string'
              },
              name: {
                type: 'string'
              },
              params: {
                type: 'array',
                items: {
                  type: 'string'
                }
              },
              content: {
                type: 'string'
              },
              height: {
                type: 'number'
              },
              width: {
                type: 'number'
              }
            }
          }
        }
      }
    }
  }
}