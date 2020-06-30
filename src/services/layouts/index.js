const schema = require('./schema');
const handlers = require('./handlers')

module.exports = async (app, opts) => {
  app.addHook('preHandler', app.auth([
    app.verifyBearerToken,
    app.verifyJwt,
  ]))
  app.get('/', handlers.GET(app))
  app.get('/:id', { schema: schema.GETById }, handlers.GETById(app))
  app.patch('/:id', { schema: schema.UPDATE }, handlers.PATCH(app))
  app.post('/', { schema: schema.CREATE }, handlers.POST(app))
}

module.exports.autoPrefix = '/layouts'
