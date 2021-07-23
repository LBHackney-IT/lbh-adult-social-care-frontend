import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL =
  process.env.NEXT_PUBLIC_AWS_ENDPOINT;

// Redundant API key (to be removed)
const AWS_KEY = process.env.NEXT_PUBLIC_AWS_KEY;
const AUTH_HEADER = { 'x-api-key': AWS_KEY };

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get('hascToken')}`;
  return config;
});

export { BASE_URL, AUTH_HEADER };
