const SendGrid = require ('@sendgrid/mail')
;

SendGrid.setApiKey (process.env.SENDGRID_API_KEY)
module.exports = SendGrid