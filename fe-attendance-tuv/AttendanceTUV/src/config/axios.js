import axios from 'axios';

const client = axios.create({
  baseURL: 'https://1eab-117-102-92-164.ngrok-free.app/',
});

export default client;
