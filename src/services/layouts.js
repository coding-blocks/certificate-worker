const schema = require('../schemas/layouts');

module.exports = async (app, opts) => {
  app.get('/', async (request, reply) => {
    return app.mongo.db
      .collection('layouts')
      .find()
      .toArray()
  })
  app.get('/:id', { schema: schema.GETById }, async (request, reply) => {
    const layout = await app.mongo.db
      .collection('layouts')
      .findOne({
        _id: app.transformStringIntoObjectId(request.params.id)
      })
    if (!layout) return reply.callNotFound()
    return layout
  })
  app.patch('/:id', { schema: schema.UPDATE }, async (request, reply) => {
    return app.mongo.db
      .collection('layouts')
      .findOneAndUpdate({
        _id: app.transformStringIntoObjectId(request.params.id)
      }, {
        $set: {
          ...request.body,
          updated_at: Date.now()
        }
      })
  })
  app.post('/', { schema: schema.CREATE }, async (request, reply) => {
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