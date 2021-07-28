import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:5000/api";

// Redundant API key (to be removed)
const AWS_KEY = process.env.NEXT_PUBLIC_AWS_KEY;
const AUTH_HEADER = { 'x-api-key': AWS_KEY };

axios.interceptors.request.use((config) => {
  const token = Cookies.get('hascToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { BASE_URL, AUTH_HEADER };
