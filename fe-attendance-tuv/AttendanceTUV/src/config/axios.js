import axios from 'axios';

const client = axios.create({
  baseURL: 'https://2cde-36-72-216-117.ngrok-free.app/',
});

export default client;
