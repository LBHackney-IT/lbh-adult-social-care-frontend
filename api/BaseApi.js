import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL =
  process.env.NEXT_PUBLIC_AWS_ENDPOINT || 'https://zqf7j796y5.execute-api.eu-west-2.amazonaws.com/staging/api';

// Redundant API key (to be removed)
const AWS_KEY = process.env.NEXT_PUBLIC_AWS_KEY || '28e2GuYzKp2XhLCF448iw95LN2pngp3uahe9C6BE';
const AUTH_HEADER = { 'x-api-key': AWS_KEY };

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get('hackneyToken')}`;
  return config;
});

export { BASE_URL, AUTH_HEADER };
