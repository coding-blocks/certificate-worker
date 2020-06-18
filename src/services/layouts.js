module.exports = async (app, opts) => {
  app.get('/', async (request, reply) => {
    return app.mongo.db
      .collection('layouts')
      .find()
      .toArray()
  })
}

module.exports.autoPrefix = '/layouts'
