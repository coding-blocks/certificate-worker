const schema = require('../schemas/layouts');
const { request } = require('needle');

module.exports = async (app, opts) => {
  app.get('/', async (request, reply) => {
    return app.mongo.db
      .collection('layouts')
      .find()
      .toArray()
  })
  app.get('/:id', async (request, reply) => {
    return app.mongo.db
      .collection('layouts')
      .findOne({
        _id: app.transformStringIntoObjectId(request.params.id)
      })
  })
  app.post('/', { schema }, async (request, reply) => {
    return app.mongo.db
      .collection('layouts')
      .insertOne({
        ...request.body,
        created_at: Date.now(),
        updated_at: Date.now()
      })
  })
}

module.exports.autoPrefix = '/layouts'
