import axios from 'axios';
import { handleError, handleResponse } from '../Utils/ApiUtils';
import { getBaseUrl } from '../BaseApi';

const RECLAIM_URL = `${getBaseUrl()}/v1/package-reclaim`;

const getReclaimFromOptions = () => axios.get(`${RECLAIM_URL}/reclaim-from`).then(handleResponse).catch(handleError);

const getReclaimFromCategories = () =>
  axios.get(`${RECLAIM_URL}/reclaim-category`).then(handleResponse).catch(handleError);

const getReclaimAmountOptions = () =>
  axios.get(`${RECLAIM_URL}/amount-options`).then(handleResponse).catch(handleError);

export { getReclaimFromOptions, getReclaimFromCategories, getReclaimAmountOptions };
