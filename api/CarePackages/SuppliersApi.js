import axios from 'axios';
import { handleError, handleResponse } from '../Utils/ApiUtils';
import { BASE_URL } from '../BaseApi';
import { getQueryParamsFromObject } from '../Utils/ApiUtils';

const SUPPLIER_URL = `${BASE_URL}/v1/suppliers`;

const getSupplierList = () => axios.get(`${SUPPLIER_URL}/get-all`).then(handleResponse).catch(handleError);

const getSuppliers = ({ supplierName }) => axios.get(`${SUPPLIER_URL}/${getQueryParamsFromObject({ supplierName })}`)

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

export { getSupplierList, createSupplier, getSuppliers };
