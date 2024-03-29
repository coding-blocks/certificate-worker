const html2pdf = require('html-pdf-node')

module.exports = {
  createPdfv2: async function (html, options) {
    return  html2pdf.generatePdf({ content: html }, {
      path: options.path,
      width: options.width,
      height: options.height
    })
  },
  createPdf: async function (html, options) {
    return new Promise((resolve, reject) => {
      html2pdf.create(html, options).toFile(options.path, function (err, res) {
        if (err) reject(err)
        resolve(res)
      });
    })
  }
}
