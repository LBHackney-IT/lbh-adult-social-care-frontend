import axios from 'axios';
import { BASE_URL } from '../BaseApi';
import { handleError, handleResponse } from '../Utils/ApiUtils';

const CARE_PACKAGE_URL = `${BASE_URL}/v1/care-packages`;

const createCarePackageReclaimFnc = (carePackageId, fundedNursingCareCreationRequest) => {
    const options = {
      url: `${CARE_PACKAGE_URL}/${carePackageId}/reclaims/fnc`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: fundedNursingCareCreationRequest,
    };
    return axios(options).then(handleResponse).catch(handleError);
  };


const updateCarePackageReclaimFnc = (carePackageId, fundedNursingCareUpdateRequest) => {
  const options = {
    url: `${CARE_PACKAGE_URL}/${carePackageId}/reclaims/fnc`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: fundedNursingCareUpdateRequest,
  };
  return axios(options).then(handleResponse).catch(handleError);
};  

const createCarePackageReclaimCareCharge = (carePackageId, careChargeReclaimCreationRequest) => {
  const options = {
      url: `${CARE_PACKAGE_URL}/${carePackageId}/reclaims/care-charges`,
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      data: careChargeReclaimCreationRequest,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const getCarePackageReclaimFnc = (carePackageId) =>
  axios
    .get(`${CARE_PACKAGE_URL}/${carePackageId}/reclaims/fnc`).
    then(handleResponse).
    catch(handleError);

const getCarePackageReclaimCareCharges = (carePackageId) =>
  axios
    .get(`${CARE_PACKAGE_URL}/${carePackageId}/reclaims/care-charges`).
    then(handleResponse).
    catch(handleError);

const getActiveFundedNursingCarePrice = (carePackageId) =>
  axios
    .get(`${CARE_PACKAGE_URL}/${carePackageId}/reclaims/fnc/active-price`).
    then(handleResponse).
    catch(handleError);

export {
    createCarePackageReclaimFnc,
    updateCarePackageReclaimFnc,
    createCarePackageReclaimCareCharge,
    getCarePackageReclaimFnc,
    getCarePackageReclaimCareCharges,
    getActiveFundedNursingCarePrice,
};
