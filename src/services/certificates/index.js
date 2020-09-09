const handlers = require('./handlers')
const schema = require('./schema')

module.exports = async (app, opts) => {
  app.addHook('preHandler', app.auth([
    app.verifyBearerToken,
    app.verifyJwt,
  ]))
  app.post('/publish', { schema: schema.PUBLISH }, handlers.PUBLISH(app))
  app.post('/generate', { schema: schema.GENERATE }, handlers.GENERATE(app))
}

module.exports.autoPrefix = '/certificates'
