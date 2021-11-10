import axios from 'axios';
import { BASE_URL } from '../BaseApi';
import { handleError, handleResponse } from '../Utils/ApiUtils';

const PAY_RUN_URL = `${BASE_URL}/v1/payruns`;

// FNC requests
export const updatePayRunStatus = (payRunId, invoiceId, newStatus) => {
  const options = {
    url: `${PAY_RUN_URL}/${payRunId}/invoices/${invoiceId}/status/${newStatus}`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};