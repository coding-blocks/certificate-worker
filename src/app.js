require('dotenv').config();
const Fastify = require('fastify');
const AutoLoad = require('fastify-autoload');
const path = require('path');
const config = require('./config');

const app = Fastify({
  logger: process.env.NODE_ENV !== 'production'
})

app
  .register(require('fastify-mongodb'), {
    url: config.db.url,
    forceClose: true
  })
  .register(require('fastify-amqp'), {
    host: config.amqp.host,
    port: config.amqp.port,
    user: config.amqp.user,
    pass: config.amqp.password
  })
  .register(require('fastify-auth'))
  .register(require('fastify-static'), {
    root: path.join(__dirname, 'assets'),
    prefix: '/assets'
  })
  .register(require('fastify-cors'), {
    origin: true
  })
  // Load all the plugins
  .register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: {}
  })
  // Load all the services
  .register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: { 
      prefix: '/api' 
    }
  })
  .listen(config.server.port, '0.0.0.0')
  .catch(err => {
    app.log.error(err)
    process.exit(1)
  })

module.exports = app
