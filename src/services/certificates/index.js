const handlers = require('./handlers')
const schema = require('./schema')

module.exports = async (app, opts) => {
  app.addHook('preHandler', app.auth([
    app.verifyBearerToken,
  ]))
  app.post('/publish', { schema: schema.PUBLISH }, handlers.PUBLISH(app))
}

module.exports.autoPrefix = '/certificates'
