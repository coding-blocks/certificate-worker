const handlers = require('./handlers')
const schema = require('./schema')

module.exports = async (app, opts) => {
  app.post('/', { schema: schema.GENERATE }, handlers.GENERATE(app))
}

module.exports.autoPrefix = '/certificates-download'
