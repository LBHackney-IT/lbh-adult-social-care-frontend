import axios from 'axios';
import { BASE_URL } from '../BaseApi';
import { handleError, handleResponse } from '../Utils/ApiUtils';

const PAY_RUN_URL = `${BASE_URL}/v1/payruns`;

export const updateInvoiceStatus = (payRunId, invoiceId, newStatus, notes) => {
  const options = {
    url: `${PAY_RUN_URL}/${payRunId}/invoices/${invoiceId}/status/${newStatus}`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    params: notes,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

export const updatePayrunAsPaid = (payRunId) => {
  const options = {
    url: `${PAY_RUN_URL}/${payRunId}/pay`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

export const releaseInvoice = (payRunId, invoiceId) => {
  const options = {
    url: `${PAY_RUN_URL}/${payRunId}/invoices/${invoiceId}/release`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};
