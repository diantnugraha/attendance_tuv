import axios from 'axios';

const client = axios.create({
  baseURL: 'https://stage-attendance-hris.tuv-nord.co.id/',
});

export default client;
