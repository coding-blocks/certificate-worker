const fp = require('fastify-plugin');
const jwt = require('jsonwebtoken');
const config = require('../config');

const parseAuthHeader = request => request.headers.authorization && request.headers.authorization.split(' ')

module.exports = fp(async (app, opts) => {
  app.decorate('verifyBearerToken', async (request, reply) => {
    const [type, token] = parseAuthHeader(request.headers)
    const val = await app.mongo.db
      .collection('tokens')
      .findOne({
        token
      })
    if (!val) {
      throw {
        statusCode: 401,
        message: 'Unauthorized'
      }
    }
  })
  app.decorate('verifyJwt', async (request, reply) => {
    const [type, token] = parseAuthHeader(request.headers)

    const payload = jwt.verify(token, config.server.secret)

    app.decorateRequest('user', payload)
  })
})
