import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.AWS_ENDPOINT;

// switch (window.location.hostname) {
//   case 'social-care-care-packages-staging.hackney.gov.uk': {
//     BASE_URL = 'https://zqf7j796y5.execute-api.eu-west-2.amazonaws.com/staging/api';
//     break;
//   }
//   case 'social-care-care-packages.hackney.gov.uk': {
//     BASE_URL = 'https://dz58oqus03.execute-api.eu-west-2.amazonaws.com/production';
//     break;
//   }
//   case 'localhost': {
//     break;
//   }
//   default: {
//     BASE_URL = '';
//     break;
//   }
// }

// Redundant API key (to be removed)
const AUTH_HEADER = { 'x-api-key': process.env.AWS_KEY };

axios.interceptors.request.use((config) => {
  const token = Cookies.get('hascToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { BASE_URL, AUTH_HEADER };
