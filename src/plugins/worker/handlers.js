const v4 = require('uuid/v4');
const moment = require('moment-timezone');
const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');
const { uploadToMinio, linkForKey } = require('../../utils/minio');
const config = require('../../config');
const pdf = require('../../utils/pdf');
const pdfv2 = require('../../utils/pdf-v2');
const U = require('./utils');
const Raven = require('raven')

// set default timezone
moment.tz.setDefault('Asia/Kolkata');

// Register Handlebars helpers
Handlebars.registerHelper('eq', (a,b) => {
  return a==b
})

module.exports = {
  GenerateFromTemplate: app => async ({ data, callback }) => {
    try {
      const { bucketName } = await app.mongo.db
      .collection('clients')
      .findOne({
        name: data.clientName
      })
      if(!bucketName) {
        throw {
          statusCode: 400,
          message: 'Client Name missing'
        }
      }
      data.salt = v4().slice(-4)
      data.run.startString =  moment.unix(data.run.start).format("MMM YYYY")
      data.run.endString = moment.unix(data.run.end).format("MMM YYYY")

      data.user.firstname = data.user?.firstname?.toLowerCase()
      data.user.lastname = data.user?.lastname?.toLowerCase()
      
      // 1. generate html
      const outPath = path.join(__dirname, '../../certification/' + v4() + ".pdf")
      const templatePath = path.join(__dirname, '../../templates/' + data.template + '.hbs')

      const document = {
          template: fs.readFileSync(templatePath).toString('utf-8'),
          context: {
            data
          },
          options: {
            height: '595px', 
            width: '842px',
            printBackground: true,
            path: outPath  
          }
      };

      const template = Handlebars.compile(document.template);
      let html = template(document.context);
      //Adding base tag in html to fetch static content from localhost
      const base = `<base href="http://localhost:${config.server.port}/assets/">`;
      // const base = `<base href="http://localhost:8000">`;
      html = html.replace(/(?:\<style\>)/, base + '<style>');

      //sending html and pdf option to puppeteer
      await pdf.createPdf(html, document.options);

      // 2. Upload to minio
      const destKeyName = `${v4()}.pdf`
      await uploadToMinio(bucketName, outPath, destKeyName)
      
      // 3. Send event via webhook
      await U.sendCallback(callback, {
        secret: config.appSecret,
        certificateId: data.certificateId,
        url: linkForKey(bucketName, destKeyName),
        salt: data.salt
      }, method='patch')
      
      // 4. Cleanup
      fs.unlinkSync(outPath)
    } catch(err) {
      console.log('certificateTemplate: ', data.template)
      U.sendCallback(callback, {
        secret: config.appSecret,
        certificateId: data.certificateId,
        error: err
      }, method = 'patch')
      throw err
    }
  },
  GenerateFromLayout: app => async data => {
    try {
      const { bucketName } = await app.mongo.db
      .collection('clients')
      .findOne({
        name: data.clientName
      })
      if(!bucketName) {
        throw {
          statusCode: 400,
          message: 'Client Not Found'
        }
      }

      const layout = await app.mongo.db
        .collection('layouts')
        .findOne({
          _id: app.transformStringIntoObjectId(data.layoutId)
        })

      const outPath = path.join(__dirname, '../../certification/' + v4() + ".pdf")
      const document = {
        template: layout.content,
        context: data.substitutions,
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
        await pdfv2.createPdfv2(html, document.options)
      } else {
        await pdf.createPdf(html, document.options);
      }
      const destKeyName = `${v4()}.pdf`
      await uploadToMinio(bucketName, outPath, destKeyName)
      fs.unlinkSync(outPath)

      await U.sendCallback(data.callback, {
        url: linkForKey(bucketName, destKeyName),
      })
    } catch(err) {
      console.log('certificateLayout: ',data.layoutId)
      Raven.captureException(err)
      U.sendCallback(data.callback, {
        secret: config.appSecret,
        certificateId: data.certificateId,
        error: err
      }, method = 'patch')
      throw err
    }
    
  }
}