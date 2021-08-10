import axios from 'axios';
// eslint-disable-next-line import/named
import { requestMethods } from '../../constants/variables';

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201 || response.status === 204) return response.data;
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation supplier-returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error('Network response was not ok.');
}

// Maybe call error logging service.
function handleError(error) {
  let errorMessage = '';
  if (error.response) {
    // Request made and server responded
    errorMessage = error.response.data.message;
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw errorMessage;
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = error.request.toString();
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
    errorMessage = error.message.toString();
    // eslint-disable-next-line no-console
    // console.error(`API call failed. ${error}`);
  }
  throw errorMessage;
}

const axiosRequest = (options = {}) => {
  const headers = options.headers || {};
  delete options.headers;

  const localOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      ...headers,
    },
    method: requestMethods.get,
    ...options,
  };

  return axios(localOptions).then(handleResponse).catch(handleError);
};

/*
  EXAMPLE
  {
    payRunId: 'very-long-id-1234',
    orderBy: 'cost',
  }

  return a string '?payRunId=very-long-id-1234&orderBy=cost'
 */
const getQueryParamsFromObject = (params = {}) => {
  let string = '';
  let count = 0;
  for (const i in params) {
    if (params[i]) {
      const paramString = `${i}=${params[i]}`;
      if (count === 0) {
        string = `?${string}${paramString}`;
      } else {
        string = `${string}&${paramString}`;
      }
      count += 1;
    }
  }
  return string;
};

const axiosFetcher = (url) => axios.get(url).then(handleResponse).catch(handleError);

export { handleError, handleResponse, axiosRequest, getQueryParamsFromObject, axiosFetcher };
