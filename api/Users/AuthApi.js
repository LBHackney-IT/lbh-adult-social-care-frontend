import axios from 'axios';
import { BASE_URL } from '../BaseApi';

import { handleError, handleResponse } from '../Utils/ApiUtils';

const AUTH_URL = `${BASE_URL}/v1/auth`;

export const hackneyGoogleLogin = (hackneyToken) => {
  const options = {
    url: `${AUTH_URL}/google-login`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      hackneyToken,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};
