const amqp = require('amqp')
const PDF = require('handlebars-pdf')
const v4 = require('uuid/v4')
const needle = require('needle')
const { uploadToMinio, linkForKey } = require('./minio')
const fs = require('fs')

const config = require('./config.json')

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
    connection.queue('amoeba-certificate', q => {
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
      // 1. generate html
      const path = './certification/' + v4() + ".pdf"
      const document = {
        template: fs.readFileSync('./templates/' + data.template + '.hbs').toString('utf-8'),
        context: {
          data
        },
        path
      }

      await PDF.create(document)

      // 2. Upload to minio
      const destKeyName = `${data.name.replace(' ', '')}_${v4()}`
      await uploadToMinio(path, destKeyName)


      // 3. Send event via webhook
      const webhookPayload = {
        secret: config.appSecret,
        certificateId: data.certificateId,
        url: linkForKey(destKeyName)
      }

      await needle('post', callback, webhookPayload, { json: true })

      // 4. Cleanup
      fs.unlinkSync(path)
    } catch (err) {

      // If we get any error, let the webhook know about it
      Raven.captureException(err)
      await needle('post', callback, { error: err }, { json: true })
    }
  });
})


