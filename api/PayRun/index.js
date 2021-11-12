import { requestMethods } from '../../constants/variables';
import { axiosRequest } from '../Utils/ApiUtils';
import { BASE_URL } from '../BaseApi';

const PAYRUNS_URL = `${BASE_URL}/v1/payruns`;

const sendPayRunsRequest = (url = '', data, method = requestMethods.post) =>
  axiosRequest({ url: `${PAYRUNS_URL}${url ? `/${url}` : ''}`, data, method });

export const createDraftPayRun = ({ type, paidUpToDate }) => sendPayRunsRequest('', { type, paidUpToDate });