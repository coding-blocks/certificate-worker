const fp = require('fastify-plugin')

function transformStringIntoObjectId(str) {
  return new this.mongo.ObjectId(str)
}

module.exports = fp((app, opts, next) => {
  app.decorate('transformStringIntoObjectId', transformStringIntoObjectId)
  next()
})
