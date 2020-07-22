const schema = require('./schema');
const handlers = require('./handlers');

module.exports = async (app, opts) => {
  app.post('/login', { schema: schema.LOGIN }, handlers.LOGIN(app))
}

module.exports.autoPrefix = '/oneauth'
