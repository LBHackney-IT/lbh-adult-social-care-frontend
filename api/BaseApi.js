import axios from 'axios';
import Cookies from 'js-cookie';

const { NEXT_PUBLIC_STAGE } = process.env;

let baseUrl = '';
let awsKey = '';

switch (NEXT_PUBLIC_STAGE) {
  case 'staging': {
    baseUrl = 'https://zqf7j796y5.execute-api.eu-west-2.amazonaws.com/staging/api';
    awsKey = '28e2GuYzKp2XhLCF448iw95LN2pngp3uahe9C6BE';
    break;
  }
  case 'production': {
    baseUrl = 'https://dz58oqus03.execute-api.eu-west-2.amazonaws.com/production/api';
    awsKey = '7l4JGeaolp9xgHUlTD8lN71iTETDzdCZ2xfjVBNy';
    break;
  }
  default: {
    baseUrl = 'https://zqf7j796y5.execute-api.eu-west-2.amazonaws.com/staging/api';
    awsKey = '28e2GuYzKp2XhLCF448iw95LN2pngp3uahe9C6BE';
    break;
  }
}

const BASE_URL = baseUrl;

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
const AUTH_HEADER = { 'x-api-key': awsKey };

axios.interceptors.request.use((config) => {
  const token = Cookies.get('hascToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { BASE_URL, AUTH_HEADER };
