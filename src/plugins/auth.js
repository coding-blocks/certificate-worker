const fp = require('fastify-plugin');

const parseAuthHeader = headers => headers.authorization && headers.authorization.split(' ')

module.exports = fp(async (app, opts) => {
  app.decorate('verifyBearerToken', async (request, reply) => {
    const [type, token] = parseAuthHeader(request.headers)
    const val = await app.mongo.db
      .collection('clients')
      .findOne({
        token
      })
    if (!val) {
      throw {
        statusCode: 401,
        message: 'Unauthorized'
      }
    }
    request.body.client = val
  })
  app.decorate('verifyJwt', async (request, reply) => {
    const [type, token] = parseAuthHeader(request.headers)

    const payload = app.decodeJwt(token)

    request.user = payload
  })
})
