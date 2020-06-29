const fp = require('fastify-plugin');
const handlers = require('./handlers');
const config = require('../../config');
const Raven = require('raven');

module.exports = fp((app, opts, next) => {
  const channel = app.amqpChannel

  channel.assertQueue(config.amqp.queuename, {
    durable: true
  })
  channel.prefetch(1)
  channel.consume(config.amqp.queuename, async msg => {
    const data = JSON.parse(msg.content.toString())
    const handler = (data.version && data.version === 2) ? handlers.GenerateFromLayout(app) : handlers.GenerateFromTemplate(app)
    
    await handler(data)
      .catch(err => {
        console.log(err)
        Raven.captureException(err)
      })
      
    channel.ack(msg)
  })

  next()
})
