const config = require('../src/config');

const ENV = {
  PUBLIC_URL: 'http://localhost:8080',
  API: {
    HOST: 'http://localhost:4242'
  },
  ONEAUTH: {
    URL: config.oneauth.url,
    CLIENT_ID: config.oneauth.client_id
  }
}

export default ENV