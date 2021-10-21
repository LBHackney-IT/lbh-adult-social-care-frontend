import { BASE_URL } from '../BaseApi';
import { axiosRequest } from '../Utils/ApiUtils';

const fetcher = async (url, options) =>
  axiosRequest({
    baseURL: `${BASE_URL}/v1`,
    url,
    ...options,
  });

export default fetcher;
