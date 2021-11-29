import axios from 'axios';
import { BASE_URL } from '../BaseApi';
import { handleError, handleResponse } from '../Utils/ApiUtils';

const CARE_PACKAGE_URL = `${BASE_URL}/v1/care-packages`;

// FNC requests
export const createCarePackageReclaimFnc = (carePackageId, fundedNursingCareCreationRequest) => {
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

export const updateCarePackageReclaimFnc = (carePackageId, fundedNursingCareUpdateRequest) => {
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

// Reclaim requests
export const createCareChargeReclaim = (carePackageId, careChargeReclaimCreationRequest) => {
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

export const updateCareChargeReclaim = (carePackageId, careChargeUpdateRequest) => {
  const options = {
    url: `${CARE_PACKAGE_URL}/${carePackageId}/reclaims/care-charges`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: careChargeUpdateRequest,
  };

  return axios(options).then(handleResponse).catch(handleError);
};

export const updateCareChargeBrokerage = (carePackageId, careChargeId, careChargeUpdateRequest) => {
  const options = {
    url: `${CARE_PACKAGE_URL}/${carePackageId}/reclaims/care-charges/${careChargeId}`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: careChargeUpdateRequest,
  };

  return axios(options).then(handleResponse).catch(handleError);
};

export const cancelCareChargeReclaim = ({ carePackageId, reclaimId }) => {
  const options = {
    url: `${CARE_PACKAGE_URL}/${carePackageId}/reclaims/care-charges/${reclaimId}/cancel`,
    method: 'PUT',
  };

  return axios(options).then(handleResponse).catch(handleError);
};

export const endCareChargeReclaim = ({ carePackageId, reclaimId, endDate }) => {
  const options = {
    url: `${CARE_PACKAGE_URL}/${carePackageId}/reclaims/care-charges/${reclaimId}/end`,
    method: 'PUT',
    data: { endDate },
  };

  return axios(options).then(handleResponse).catch(handleError);
};
