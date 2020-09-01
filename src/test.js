// An example producer

const amqp = require('amqp')
const fs = require('fs')
const config = require('./config')

const connection = amqp.createConnection({
  host: '127.0.0.1',
  login: 'test',
  password: 'test',
  port: 5672
})

connection.on('error', function (e) {
  console.error("Error from amqp: ", e)
})

const connectionPromise = new Promise ((resolve, reject) => {
  connection.on('ready', () => resolve(connection))
})

const eq = x => y => x==y

connectionPromise.then(conn => {
  // fs.readdir(__dirname + '/templates', (err, files) => {
  //   if (!err) {
  //     files.forEach(file => {
        conn.publish(config.amqp.queuename, {
          secret: 'somesecretshitshere',
          data: {
            certificateId: Math.floor(Math.random()* 100),
            user: {
              firstname: 'ASIF',
              lastname: 'KHAN'
            },
            runAttempt: {
              id: 5894
            },
            run: {
              start: 1548416975,
              end: 1548416990,
              // domain: "hellointern"
            },
            template: 'faang'
          },
          callback: 'evil.com'
        })
  //     })
  //   } else {
  //     console.log(err)
  //   }
  // })
})



