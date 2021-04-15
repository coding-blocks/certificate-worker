module.exports = {
  amqp: {
    host: process.env.host || "localhost",
    user: process.env.login || "amoeba",
    password: process.env.password || "123456",
    port: process.env.port || "5672",
    queuename: process.env.queuename || 'certificate-queue'
  },
  appSecret: process.env.appSecret || "" ,
  db: {
    url: process.env.DB_URL || 'mongodb://localhost/certificates'
  },
  server: {
    api_url: process.env.API_URL || "http://localhost:4242",
    frontend_url: process.env.FRONTEND_URL || "http://localhost:8080",
    port: process.env.PORT || 4242,
    secret: process.env.SECRET || 'securityFTW'
  },
  oneauth: {
    url: process.env.ONEAUTH_URL || 'https://account.codingblocks.com',
    client_id: process.env.CLIENT_ID || 2912225628,
    client_secret: process.env.CLIENT_SECRET
  },
  minio: {
    url: process.env.monioUrl || "minio.codingblocks.com",
    bucketName: process.env.minioBucketName || "bucket",
    accessKey: process.env.minioAccessKey || "bleh",
    secretKey: process.env.minioSecretKey || "WontWork"
  },
  sentryDSN: process.env.sentryDSN || "http://no:willnotwork@xxx.cb.lk/007"
}