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
  uploadToMinio (filePath, destKeyName) {
    return new Promise( (resolve, reject) => {
      minioClient.fPutObject(config.minio.bucketName, destKeyName, filePath, (err, etag) => {
        if (err) return reject(err)
        resolve(etag)
      })
    })
  },
  linkForKey (key) {
    return `https://minio.codingblocks.com/${config.minio.bucketName}/${key}`
  }
}
