const axios = require('axios');

module.exports = {
  sendCallback(callbackUrl, payload, method='post') {
    return axios[method](callbackUrl, payload)
  }
}
