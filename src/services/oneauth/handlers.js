const axios = require('axios');
const config = require('../../config');

module.exports = {
  LOGIN: app => async (request, reply) => {
    const tokenResp = await axios.post(`${config.oneauth.url}/oauth/token`, {
      client_id: config.oneauth.client_id,
      client_secret: config.oneauth.client_secret,
      redirect_uri: 'http://localhost:8080/oneauth/callback',
      grant_type: 'authorization_code',
      code: request.body.code
    })

    const { access_token } = tokenResp.data

    const userResp = await axios.get(`${config.oneauth.url}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    return {
      jwt: app.encodeJwt(userResp.data),
      user: userResp.data
    }
  }
}
