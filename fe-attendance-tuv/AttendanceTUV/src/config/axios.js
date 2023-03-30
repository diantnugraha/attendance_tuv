import axios from 'axios';

const client = axios.create({
  baseURL: 'https://b9c7-117-102-92-164.ap.ngrok.io/',
});

export default client;
