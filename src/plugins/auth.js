const fp = require('fastify-plugin');

module.exports = fp(async (app, opts) => {
  app.decorate('verifyBearerToken', (request, reply, done) => {
    const token = request.headers.authorization && request.headers.authorization.split('Bearer ')[1]
    app.mongo.db
      .collection('tokens')
      .findOne({
        token
      })
      .then(val => {     
        if (!val) throw {
          statusCode: 401,
          message: 'Unauthorized'
        }  
        done()
      })
      .catch(done)
  })
})
