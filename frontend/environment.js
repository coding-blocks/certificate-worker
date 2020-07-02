const config = require('../src/config');

const ENV = {
  PUBLIC_URL: config.server.frontend_url,
  API: {
    HOST: config.server.api_url
  },
  ONEAUTH: {
    URL: config.oneauth.url,
    CLIENT_ID: config.oneauth.client_id
  }
}

export default ENV