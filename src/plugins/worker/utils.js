const axios = require('axios');

module.exports = {
  sendCallback(callbackUrl, payload) {
    return axios.post(callbackUrl, payload)
  }
}
