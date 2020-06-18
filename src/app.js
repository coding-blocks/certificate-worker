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
  .listen(config.server.port)
  .catch(err => {
    app.log.error(err)
    process.exit(1)
  })

module.exports = app