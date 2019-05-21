// An example producer

const amqp = require('amqp')
const fs = require('fs')
require('dotenv').config()

const connection = amqp.createConnection({
  host: process.env.host,
  login: process.env.login,
  password: process.env.password,
  port: process.env.port
})

connection.on('error', function (e) {
  console.error("Error from amqp: ", e)
})

const connectionPromise = new Promise ((resolve, reject) => {
  connection.on('ready', () => resolve(connection))
})

connectionPromise.then(conn => {
  fs.readdir('./src/templates', (err, files) => {
    if (!err){
      files.forEach(file => {
        conn.publish('amoeba-certificate', {
          secret: 'somesecretshitshere',
          certificateId: Math.floor(Math.random()* 100),
          data: {
            user: {
              firstname: 'Jatin',
              lastname: 'Katyal'
            },
            runAttempt: {
              id: 5894
            },
            run: {
              start: 1548416975,
              end: 1548416990
            },
            template: file.split('.')[0]
          },
          callback: 'evil.com'
        })
      })
    } else {
      console.log(err)
    }
  })
})
