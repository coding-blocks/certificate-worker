const html2pdf = require('html-pdf')

module.exports = {
  createPdf: async function(html, options) {
    return new Promise((resolve, reject) => {
      html2pdf.create(html, options).toFile(options.path, function(err, res) {
        if (err) reject(err)
        resolve(res)
      });
    })
  }
}
