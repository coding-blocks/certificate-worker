const pdf = require('./pdf')
const fs = require('fs')
const hbs = require('handlebars')
const BPromise = require('bluebird');
const path = require('path')
const users = fs.readFileSync('../../cert-users.csv', 'utf8').split('\n').map(_ => _.split(','))
const Mailer = require('./mailer')
;

(async function() {
  const template = hbs.compile(fs.readFileSync('../templates/nagarro-trainer-cert.hbs', 'utf8'))
  await BPromise.map(users, async (user) => {
    const [name, email] = user
    const outPath = path.join(__dirname, `../../pdfs/${email.split('@')[0]}.pdf`)
    try {
      const html = template({name})
      await pdf.createPdf(html, {
        height: '1000px',
        width: '700px',
        printBackground: true,
        path: outPath
      })

      const attachment = fs.readFileSync(outPath).toString('base64')
      await Mailer.send({
        to: email,
        from: 'support@codingbocks.com',
        templateId: 'f80fa8e2-1fdd-4d3b-978a-d7928ab54c1b',
        substitutions: {
          name
        },
        attachments: [
          {
            content: attachment,
            filename: "attachment.pdf",
            type: "application/pdf",
            disposition: "attachment"
          }
        ]
      })

      console.log('success', email)
    } catch(err) {
      console.log('error', email, err)
    }
  }, {
    concurrency: 3
  })
})()
.then(() => process.exit())
.catch(err => console.log(err))