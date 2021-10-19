import axios from 'axios';
import { handleError, handleResponse } from '../Utils/ApiUtils';
import { BASE_URL } from '../BaseApi';

const SUPPLIER_URL = `${BASE_URL}/v1/suppliers`;

export const getSupplierList = () => axios.get(`${SUPPLIER_URL}/get-all`).then(handleResponse).catch(handleError);

export const createSupplier = (supplierForCreation) => {
  const options = {
    url: `${SUPPLIER_URL}`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: supplierForCreation,
  };
  return axios(options).then(handleResponse).catch(handleError);
};
