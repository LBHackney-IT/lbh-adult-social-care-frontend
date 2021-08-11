import { BASE_URL } from '../api/BaseApi';
import { axiosRequest } from '../api/Utils/ApiUtils';

const fetcher = async (url, options) =>
  axiosRequest({
    baseURL: `${BASE_URL}/v1`,
    url,
    ...options,
  });

export default fetcher;
