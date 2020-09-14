const config = require('../../config');
const path = require('path');
const Handlebars = require('handlebars');
const { uploadToMinio, linkForKey } = require('../../utils/minio');
const pdf = require('../../utils/pdf');
const v4 = require('uuid/v4');

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
  },
  GENERATE: app => async (request, reply) => {
    const layout = await app.mongo.db
      .collection('layouts')
      .findOne({
        _id: app.transformStringIntoObjectId(request.body.layoutId)
      })

    if (!layout) throw {
      statusCode: 400,
      message: 'Layout Not Found'
    }

    const destKeyName = `${v4()}.pdf`
    const outPath = path.join(__dirname, '../../certification/' + v4() + ".pdf")
    const document = {
      template: layout.content,
      context: {
        ...request.body.substitutions,
        pdfFileName: destKeyName
      },
      options: {
        height: `${+layout.height || 408}px`,
        width: `${+layout.width || 842}px`,
        printBackground: true,
        path: outPath  
      }
    };

    const template = Handlebars.compile(document.template);
    const html = template(document.context);
    await pdf.createPdf(html, document.options);
    await uploadToMinio(outPath, destKeyName)
    const url = linkForKey(destKeyName)

    return {
      url
    }
  }
}