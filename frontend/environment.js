const config = require('../src/config');

const ENV = {
  PUBLIC_URL: process.env.FRONTEND_URL || "http://localhost:8080",
  API: {
    HOST: process.env.API_URL || "http://localhost:4242",
  },
  ONEAUTH: {
    URL: process.env.ONEAUTH_URL || 'https://account.codingblocks.com',
    CLIENT_ID: process.env.CLIENT_ID || 2912225628,
  }
}

export default ENV