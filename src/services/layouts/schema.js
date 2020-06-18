module.exports = {
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
        }
      }
    }
  },
  CREATE: {
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
        }
      }
    }
  }
}