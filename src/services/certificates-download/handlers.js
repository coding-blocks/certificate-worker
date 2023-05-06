const config = require('../../config');
const path = require('path');
const Handlebars = require('handlebars');
const pdf = require('../../utils/pdf');
const pdfv2 = require('../../utils/pdf-v2');
const v4 = require('uuid/v4');
const fs = require('fs')

module.exports = {
  GENERATE: app => async (request, reply) => {
    const layout = await app.mongo.db
      .collection('layouts')
      .findOne({
        _id: app.transformStringIntoObjectId(request.body.layoutId || request.query.layoutId)
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
    if(layout.useHtmlPdf) {
      await pdfv2.createPdf(html, document.options)
    } else {
      await pdf.createPdf(html, document.options);
    }
    const file = fs.readFileSync(outPath, 'utf8')
    fs.unlinkSync(outPath)
    reply.header('Content-Type', 'application/octet-stream')
    reply.header('Content-Disposition', `attachment; filename="certificate.pdf"`)
    reply.send(file)
  }
}