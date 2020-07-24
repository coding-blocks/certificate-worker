module.exports = {
  GET: app => async (request, reply) => {
    const offset = request.query.offset ? parseInt(request.query.offset, 10) : 0
    const limit = request.query.limit ? parseInt(request.query.limit,  10) : 10
    return app.mongo.db
      .collection('layouts')
      .find().skip(offset).limit(limit)
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
    const res = await app.mongo.db
      .collection('layouts')
      .insertOne({
        ...request.body,
        created_at: Date.now(),
        updated_at: Date.now()
      })

    return {
      value: res.ops[0]
    }
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
  }
}