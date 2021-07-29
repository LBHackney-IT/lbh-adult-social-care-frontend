import axios from 'axios';
import Cookies from 'js-cookie';

const getBaseUrl = () => {
  switch (window.location.hostname) {
    case 'social-care-care-packages-staging.hackney.gov.uk': {
      return 'https://zqf7j796y5.execute-api.eu-west-2.amazonaws.com/staging/api';
    }
    case 'social-care-care-packages.hackney.gov.uk': {
      return 'https://dz58oqus03.execute-api.eu-west-2.amazonaws.com/production/api';
    }
    case 'localhost': {
      return 'https://zqf7j796y5.execute-api.eu-west-2.amazonaws.com/staging/api';
    }
    default: {
      return '';
    }
  }
};

// Redundant API key (to be removed)
const AWS_KEY = '28e2GuYzKp2XhLCF448iw95LN2pngp3uahe9C6BE' || process.env.NEXT_PUBLIC_AWS_KEY;
const AUTH_HEADER = { 'x-api-key': AWS_KEY };

axios.interceptors.request.use((config) => {
  const token = Cookies.get('hascToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { getBaseUrl, AUTH_HEADER };
