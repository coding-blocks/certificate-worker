const schema = require('./schema');
const handlers = require('./handlers')

module.exports = async (app, opts) => {
  app.get('/', handlers.GET)
  app.get('/:id', { schema: schema.GETById }, handlers.GETById)
  app.patch('/:id', { schema: schema.UPDATE }, handlers.PATCH)
  app.post('/', { schema: schema.CREATE }, handlers.POST)
}

module.exports.autoPrefix = '/layouts'
