import axios from 'axios';
import Cookies from 'js-cookie';

let baseUrl = '';

switch (process.env.NEXT_PUBLIC_STAGE) {
  case 'staging': {
    baseUrl = 'https://zqf7j796y5.execute-api.eu-west-2.amazonaws.com/staging/api';
    break;
  }
  case 'local': {
    baseUrl = 'http://localhost:5000/api';
    break;
  }
  case 'production': {
    baseUrl = 'https://dz58oqus03.execute-api.eu-west-2.amazonaws.com/production/api';
    break;
  }
  default: {
    baseUrl = 'https://zqf7j796y5.execute-api.eu-west-2.amazonaws.com/staging/api';
    break;
  }
}

const BASE_URL = baseUrl;
const HASC_TOKEN_ID = `hascToken${process.env.NEXT_PUBLIC_STAGE}`;

axios.interceptors.request.use((config) => {
  const token = Cookies.get(HASC_TOKEN_ID);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { BASE_URL, HASC_TOKEN_ID };
