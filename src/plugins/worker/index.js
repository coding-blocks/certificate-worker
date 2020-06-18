const fp = require('fastify-plugin');
const handlers = require('./handlers');
const config = require('../../config');

module.exports = fp((app, opts, next) => {
  const channel = app.amqpChannel

  channel.assertQueue(config.amqp.queuename, {
    durable: true
  })
  channel.prefetch(1)
  channel.consume(config.amqp.queuename, msg => 
    handlers
      .GenerateFromTemplate(msg)
      .then(() => channel.ack(msg))
  )

  next()
})
