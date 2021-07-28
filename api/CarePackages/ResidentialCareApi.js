import axios from 'axios';
import { BASE_URL } from '../BaseApi';
import { handleError, handleResponse } from '../Utils/ApiUtils';

export const RESIDENTIAL_CARE_URL = `${BASE_URL}/v1/residential-care-packages`;

const getResidentialCareAdditionalNeedsCostOptions = () => [
  { text: 'Weekly', value: 1 },
  { text: 'One off', value: 2 },
  { text: 'Fixed Period', value: 3 },
];

const getTypeOfResidentialCareHomeOptions = () =>
  axios.get(`${RESIDENTIAL_CARE_URL}/type-of-residential-care-homes`).then(handleResponse).catch(handleError);

const createResidentialCarePackage = (residentialCarePackageForCreation) => {
  const options = {
    url: `${RESIDENTIAL_CARE_URL}`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: residentialCarePackageForCreation,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const createResidentialCarePackageReclaim = (residentialCarePackageId, data) => {
  const options = {
    url: `${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}/package-reclaim`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

/* const updateResidentialCarePackage = (residentialCarePackageId, residentialCarePackageForUpdate) => {
  const options = {
    url: `${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}`,
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: residentialCarePackageForUpdate
  };
  return axios(options)
    .then(handleResponse)
    .catch(handleError);
} */

const getResidentialCarePackageList = () =>
  axios.get(`${RESIDENTIAL_CARE_URL}/get-all`).then(handleResponse).catch(handleError);

const getSingleResidentialCarePackage = (residentialCarePackageId) =>
  axios.get(`${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}`).then(handleResponse).catch(handleError);

const getResidentialCarePackageApprovalPackageContent = (residentialCarePackageId) =>
  axios
    .get(`${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}/approve-package-contents`)
    .then(handleResponse)
    .catch(handleError);

const getResidentialCarePackageApproveBrokered = (residentialCarePackageId) =>
  axios
    .get(`${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}/approve-brokered-deal`)
    .then(handleResponse)
    .catch(handleError);

const getResidentialCarePackageApprovalHistory = (residentialCarePackageId) =>
  axios
    .get(`${RESIDENTIAL_CARE_URL}/approval-history/${residentialCarePackageId}`)
    .then(handleResponse)
    .catch(handleError);

const residentialCareRequestClarification = (residentialCarePackageId, informationText) => {
  const options = {
    url: `${BASE_URL}/v1/residential-care-request-more-information`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      residentialCarePackageId,
      informationText,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const residentialCareClarifyCommercial = (residentialCarePackageId, informationText) => {
  const options = {
    url: `${BASE_URL}/v1/residential-care-request-more-information/clarifying-commercials`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      residentialCarePackageId,
      informationText,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const residentialCareApprovePackageContent = (residentialCarePackageId) => {
  const options = {
    url: `${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}/approve-package-contents`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      residentialCarePackageId,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const residentialCareApproveCommercials = (residentialCarePackageId) => {
  const options = {
    url: `${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}/approve-brokered-deal`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      residentialCarePackageId,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const residentialCareChangeStatus = (residentialCarePackageId, newStatusId) => {
  const options = {
    url: `${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}/change-status/${newStatusId}`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      residentialCarePackageId,
      newStatusId,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

// Residential care brokerage
const getResidentialCareBrokerageStages = () =>
  axios.get(`${BASE_URL}/v1/stages`).then(handleResponse).catch(handleError);

const getResidentialCarePackageDetailsForBrokerage = (residentialCarePackageId) =>
  axios.get(`${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}/brokerage`).then(handleResponse).catch(handleError);

const createResidentialCareBrokerageInfo = (residentialCarePackageId, residentialCareBrokerageInfoForCreation) => {
  const options = {
    url: `${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}/brokerage`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: residentialCareBrokerageInfoForCreation,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const residentialCareChangeStage = (residentialCarePackageId, stageId) => {
  const options = {
    url: `${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}/brokerage/stage/${stageId}`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      residentialCarePackageId,
      stageId,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

export {
  getResidentialCareAdditionalNeedsCostOptions,
  getTypeOfResidentialCareHomeOptions,
  createResidentialCarePackage,
  createResidentialCarePackageReclaim,
  getResidentialCarePackageList,
  getSingleResidentialCarePackage,
  getResidentialCarePackageApprovalPackageContent,
  getResidentialCarePackageApproveBrokered,
  getResidentialCarePackageApprovalHistory,
  residentialCareRequestClarification,
  residentialCareClarifyCommercial,
  residentialCareChangeStatus,
  residentialCareApprovePackageContent,
  residentialCareApproveCommercials,
  getResidentialCareBrokerageStages,
  getResidentialCarePackageDetailsForBrokerage,
  createResidentialCareBrokerageInfo,
  residentialCareChangeStage,
};
