import axios from 'axios';
import ENV from '~/environment';

const client = axios.create({
  baseURL: ENV.API.HOST + '/api',
  responseType: 'json'
})

client.interceptors.request.use(config => {
  return {
    ...config,
    headers: {
      Authorization: `JWT ${localStorage.getItem('certificate-jwt')}`
    }
  };
});

client.interceptors.response.use(response => {
  if (response.status === 401) {
    localStorage.removeItem('certificate-jwt')
  }

  return response
})

export default client
