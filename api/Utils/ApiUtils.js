import axios from 'axios';
// eslint-disable-next-line import/named
import { requestMethods } from '../../constants/variables';

export const handleResponse = async (response) => {
  if (response.status === 200 || response.status === 201 || response.status === 204) return response.data;
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation supplier-returns a string error message, so parse as text instead of json.
    // const error = await response.text();
    // throw new Error(error);
    throw new Error('Bad request');
  }
  throw new Error('Network response was not ok.');
};

// Maybe call error logging service.
export const handleError = (error) => {
  let errorMessage = '';
  if (error.response) {
    // Request made and server responded

    // return array of messages from server response
    if (Array.isArray(error.response.data.errors)) {
      errorMessage = error.response.data.errors.map((item) => item.message);
      throw errorMessage;
    }

    // return string message from server response
    errorMessage = error.response.data.message;
    throw errorMessage;
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = error.request.toString();
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = error.message.toString();
    // eslint-disable-next-line no-console
    // console.error(`API call failed. ${error}`);
  }
  throw errorMessage;
};

export const axiosRequest = (options = {}) => {
  const headers = options.headers || {};
  delete options.headers;

  const localOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    method: requestMethods.get,
    ...options,
  };

  return axios(localOptions).then(handleResponse).catch(handleError);
};

export const axiosFetcher = (url) => axios.get(url).then(handleResponse).catch(handleError);
