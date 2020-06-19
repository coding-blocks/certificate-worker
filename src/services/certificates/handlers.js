const config = require('../../config');

module.exports = {
  PUBLISH: app => async (request, reply) => {
    const layout = await app.mongo.db
      .collection('layouts')
      .findOne({
        _id: app.transformStringIntoObjectId(request.body.layoutId)
      })
    
    if (!layout) throw {
      statusCode: 400,
      message: 'Layout Not Found'
    }

    const payload = {
      version: 2,
      substitutions: request.body.substitutions,
      layoutId: request.body.layoutId,
      callback: request.body.callback
    }

    app.amqpChannel.sendToQueue(config.amqp.queuename, (new Buffer(JSON.stringify(payload))))

    reply.code(204)
  }
}