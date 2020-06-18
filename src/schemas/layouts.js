module.exports = {
  CREATE: {
    body: {
      type: 'object',
      properties: {
        name: 'string',
        params: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        content: 'string'
      }
    }
  }
}