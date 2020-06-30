import axios from 'axios';
import ENV from '~/environment';

const client = axios.create({
  baseURL: ENV.API.HOST + '/api',
  responseType: 'json'
})

export default client
