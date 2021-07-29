import axios from 'axios';
import { handleError, handleResponse } from '../Utils/ApiUtils';
import { getBaseUrl } from '../BaseApi';

const SUPPLIER_URL = `${getBaseUrl()}/v1/suppliers`;

const getSupplierList = () => axios.get(`${SUPPLIER_URL}/get-all`).then(handleResponse).catch(handleError);

const createSupplier = (supplierForCreation) => {
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

export { getSupplierList, createSupplier };
