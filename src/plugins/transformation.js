const fp = require('fastify-plugin')

function transformStringIntoObjectId(str) {
  try {
    return new this.mongo.ObjectId(str)
  } catch (err) {
    return ''
  }
}

module.exports = fp((app, opts, next) => {
  app.decorate('transformStringIntoObjectId', transformStringIntoObjectId)
  next()
})
