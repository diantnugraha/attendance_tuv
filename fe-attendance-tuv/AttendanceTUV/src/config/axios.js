import axios from 'axios';

const client = axios.create({
  baseURL: 'https://e0e4-117-102-92-164.ngrok-free.app/',
});

export default client;
