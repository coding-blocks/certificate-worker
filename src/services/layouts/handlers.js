module.exports = {
  GET: app => async (request, reply) => {
    return app.mongo.db
      .collection('layouts')
      .find()
      .toArray()
  },
  GETById: app => async (request, reply) => {
    const layout = await app.mongo.db
      .collection('layouts')
      .findOne({
        _id: app.transformStringIntoObjectId(request.params.id)
      })
    if (!layout) return reply.callNotFound()
    return layout
  },
  POST: app => async (request, reply) => {
    return app.mongo.db
      .collection('layouts')
      .insertOne({
        ...request.body,
        created_at: Date.now(),
        updated_at: Date.now()
      })
      .value
  },
  PATCH: app => async (request, reply) => {
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
      .value
  }
}