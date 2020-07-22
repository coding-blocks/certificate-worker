const fp = require('fastify-plugin');
const jwt = require('jsonwebtoken');
const config = require('../config');

const encodeJwt = payload => jwt.sign(payload, config.server.secret, { expiresIn: '7d' })
const decodeJwt = token => jwt.verify(token, config.server.secret)

module.exports = fp((app, opts, next) => {
  app.decorate('encodeJwt', encodeJwt)
  app.decorate('decodeJwt', decodeJwt)
  next()
})
