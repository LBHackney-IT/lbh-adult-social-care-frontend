import axios from 'axios';
import Cookies from 'js-cookie';
import { APP_SERVICE_ROUTES } from '../routes/RouteConstants';

let baseUrl = '';

switch (process.env.NEXT_PUBLIC_STAGE) {
  case 'staging': {
    baseUrl = 'https://zqf7j796y5.execute-api.eu-west-2.amazonaws.com/staging/api';
    break;
  }
  case 'local': {
    baseUrl = process.env.NEXT_PUBLIC_AWS_ENDPOINT || 'http://localhost:5000/api';
    break;
  }
  case 'production': {
    baseUrl = 'https://dz58oqus03.execute-api.eu-west-2.amazonaws.com/production/api';
    break;
  }
  default: {
    baseUrl = 'https://l3qbectgf1.execute-api.eu-west-2.amazonaws.com/development/api';
    break;
  }
}

const BASE_URL = baseUrl;
const HACKNEY_TOKEN_ID = `hackneyToken`;

export const MULTIPART_FORM_DATA = 'multipart/form-data';

axios.interceptors.request.use((config) => {
  const token = Cookies.get(HACKNEY_TOKEN_ID);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(null, async (error) => {
  // redirect to login to refresh hackneyToken since it is expired
  if (error?.response?.status === 401) {
    Cookies.remove('hackneyToken');
    await axios.get('/api/logout');
    window.location.pathname = APP_SERVICE_ROUTES.login;
  }
  return Promise.reject(error);
});

export { BASE_URL, HACKNEY_TOKEN_ID };
