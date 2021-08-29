const Minio = require('minio')
const config = require('../config')

var minioClient = new Minio.Client({
  endPoint: config.minio.url,
  port: 443,
  useSSL: true,
  accessKey: config.minio.accessKey,
  secretKey: config.minio.secretKey
});

module.exports = {
  uploadToMinio (bucketName, filePath, destKeyName) {
    return new Promise( (resolve, reject) => {
      minioClient.fPutObject(bucketName, destKeyName, filePath, {'Content-Type': 'application/pdf'}, (err, etag) => {
        if (err) return reject(err)
        resolve(etag)
      })
    })
  },
  linkForKey (bucketName, key) {
    return `https://minio.codingblocks.com/${bucketName}/${key}`
  }
}
