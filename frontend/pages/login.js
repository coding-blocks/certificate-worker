import ENV from '~/environment';

export default () => {
  window.location.href = `${ENV.ONEAUTH.URL}/oauth/authorize?response_type=code&client_id=${ENV.ONEAUTH.CLIENT_ID}&redirect_uri=${ENV.PUBLIC_URL}/oneauth/callback`
  return null
}