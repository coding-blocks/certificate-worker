// An example producer

const amqp = require('amqp')
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

const connectionPromise = new Promise ((resolve, reject) => {
  connection.on('ready', () => resolve(connection))
})

connectionPromise.then(conn => {
  conn.publish('amoeba-certificate', {
    secret: 'somesecretshitshere',
    certificateId: Math.floor(Math.random()* 100),
    data: {
      name: 'abhishek',
      template: 'java'
    },
    callback: 'evil.com'
  })
})



