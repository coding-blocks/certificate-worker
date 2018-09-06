const Raven = require('raven'),
  config = require('../config.json')


  Raven.config(config.sentryDSN, {
    autoBreadcrumbs: true,
    captureUnhandledRejections: true
}).install()

module.exports = Raven