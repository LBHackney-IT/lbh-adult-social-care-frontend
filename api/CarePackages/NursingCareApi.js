import axios from 'axios';
import { getBaseUrl } from '../BaseApi';
import { handleError, handleResponse } from '../Utils/ApiUtils';

export const NURSING_CARE_URL = `${getBaseUrl()}/v1/nursing-care-packages`;

const getTypeOfNursingHomeOptions = () =>
  axios.get(`${NURSING_CARE_URL}/type-of-nursing-care-homes`).then(handleResponse).catch(handleError);

const createNursingCarePackage = (nursingCarePackageForCreation) => {
  const options = {
    url: `${NURSING_CARE_URL}`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: nursingCarePackageForCreation,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const createNursingCarePackageReclaim = (nursingCarePackageId, data) => {
  const options = {
    url: `${NURSING_CARE_URL}/${nursingCarePackageId}/package-reclaim`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

/* const updateNursingCarePackage = (nursingCarePackageId, nursingCarePackageForUpdate) => {
  const options = {
    url: `${NURSING_CARE_URL}/${nursingCarePackageId}`,
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: nursingCarePackageForUpdate
  };
  return axios(options)
    .then(handleResponse)
    .catch(handleError);
} */

const getNursingCarePackageList = () =>
  axios.get(`${NURSING_CARE_URL}/get-all`).then(handleResponse).catch(handleError);

const getSingleNursingCarePackage = (nursingCarePackageId) =>
  axios.get(`${NURSING_CARE_URL}/${nursingCarePackageId}`).then(handleResponse).catch(handleError);

const getNursingCarePackageApprovalPackageContent = (nursingCarePackageId, hascToken) =>
  axios
    .get(`${NURSING_CARE_URL}/${nursingCarePackageId}/approve-package-contents`, {
      headers: {
        Authorization: `Bearer ${hascToken}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);

const getNursingCarePackageApproveCommercial = (nursingCarePackageId, hascToken) =>
  axios
    .get(`${NURSING_CARE_URL}/${nursingCarePackageId}/approve-commercials`, {
      headers: {
        Authorization: `Bearer ${hascToken}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);

const getNursingCarePackageApprovalHistory = (nursingCarePackageId, hascToken) =>
  axios
    .get(`${NURSING_CARE_URL}/approval-history/${nursingCarePackageId}`, {
      headers: {
        Authorization: `Bearer ${hascToken}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);

const nursingCareRequestClarification = (nursingCarePackageId, informationText) => {
  const options = {
    url: `${getBaseUrl()}/v1/nursing-care-request-more-information`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      nursingCarePackageId,
      informationText,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const nursingCareClarifyCommercial = (nursingCarePackageId, informationText) => {
  const options = {
    url: `${getBaseUrl()}/v1/nursing-care-request-more-information/clarifying-commercials`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      nursingCarePackageId,
      informationText,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const nursingCareChangeStatus = (nursingCarePackageId, newStatusId) => {
  const options = {
    url: `${NURSING_CARE_URL}/${nursingCarePackageId}/change-status/${newStatusId}`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      nursingCarePackageId,
      newStatusId,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const nursingCareApprovePackageContent = (nursingCarePackageId) => {
  const options = {
    url: `${NURSING_CARE_URL}/${nursingCarePackageId}/approve-package-contents`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      nursingCarePackageId,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const nursingCareApproveCommercials = (nursingCarePackageId) => {
  const options = {
    url: `${NURSING_CARE_URL}/${nursingCarePackageId}/approve-commercials`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      nursingCarePackageId,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const nursingCareChangeStage = (nursingCarePackageId, stageId) => {
  const options = {
    url: `${NURSING_CARE_URL}/${nursingCarePackageId}/brokerage/stage/${stageId}`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      nursingCarePackageId,
      stageId,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

// Nursing care brokerage
const getNursingCareBrokerageStages = () => axios.get(`${getBaseUrl()}/v1/stages`).then(handleResponse).catch(handleError);

const getNursingCarePackageDetailsForBrokerage = (nursingCarePackageId, hascToken) =>
  axios
    .get(`${NURSING_CARE_URL}/${nursingCarePackageId}/brokerage`, {
      headers: {
        Authorization: `Bearer ${hascToken}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);

const createNursingCareBrokerageInfo = (nursingCarePackageId, nursingCareBrokerageInfoForCreation) => {
  const options = {
    url: `${NURSING_CARE_URL}/${nursingCarePackageId}/brokerage`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: nursingCareBrokerageInfoForCreation,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

export {
  getTypeOfNursingHomeOptions,
  createNursingCarePackage,
  createNursingCarePackageReclaim,
  getNursingCarePackageList,
  getSingleNursingCarePackage,
  getNursingCarePackageApprovalPackageContent,
  getNursingCarePackageApproveCommercial,
  getNursingCarePackageApprovalHistory,
  nursingCareRequestClarification,
  nursingCareClarifyCommercial,
  nursingCareChangeStatus,
  nursingCareChangeStage,
  nursingCareApprovePackageContent,
  nursingCareApproveCommercials,
  getNursingCareBrokerageStages,
  getNursingCarePackageDetailsForBrokerage,
  createNursingCareBrokerageInfo,
};
