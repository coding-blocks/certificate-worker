const amqp = require('amqp')
const PDF = require('handlebars-pdf')
const v4 = require('uuid/v4')
const p = require('path')
const needle = require('needle')
const fs = require('fs')

const Raven = require('./raven')
const { uploadToMinio, linkForKey } = require('./minio')
const config = require('../config.json')

const connection = amqp.createConnection({
  host: config.host,
  login: config.login,
  password: config.password,
  port: config.port
})

connection.on('error', function (e) {
  console.error("Error from amqp: ", e)
})

const queuePromise = new Promise((resolve, reject) => {
  connection.on('ready', function () {
    connection.queue('amoeba-certificate', {durable: true, autoDelete: false}, q => {
      resolve(q)
    })
  })
})

queuePromise.then(q => {
  // Catch all messages
  q.bind('#');

  // Receive messages
  q.subscribe(async function ({ data, callback }) {
    try {
      data.salt = v4().slice(-4)

      // 1. generate html
      const path = p.join(__dirname, './certification/' + v4() + ".pdf")
      const templatePath = p.join(__dirname, './templates/' + data.template + '.hbs')

      const document = {
        template: fs.readFileSync(templatePath).toString('utf-8'),
        context: {
          data
        },
        path,
        options: {
          type: "pdf",
          format: "A4",
          orientation: "landscape",
          border: "0",
          base: "file:///" + __dirname + '/assets/'
        }
      }

      await PDF.create(document, {
        phantomPath: p.join(__dirname, '../node_modules/phantomjs-prebuilt/bin/phantomjs')
      })

      // 2. Upload to minio
      const destKeyName = `${data.name.replace(' ', '')}_${v4()}`
      await uploadToMinio(path, destKeyName)


      // 3. Send event via webhook
      const webhookPayload = {
        secret: config.appSecret,
        certificateId: data.certificateId,
        url: linkForKey(destKeyName),
        salt: data.salt
      }
	
      await needle('patch', callback, webhookPayload, { json: true })

      // 4. Cleanup
      fs.unlinkSync(path)
    } catch (err) {

      // If we get any error, let the webhook know about it
      Raven.captureException(err)
      await needle('patch', callback, {
        certificateId: data.certificateId,
        secret: config.appSecret,
        error: err
      }, { json: true })
    }
  });
})


