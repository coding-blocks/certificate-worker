const Raven = require('raven'),
  config = require('./config')


  Raven.config(config.sentryDSN, {
    autoBreadcrumbs: true,
    captureUnhandledRejections: true
}).install()

module.exports = Raven