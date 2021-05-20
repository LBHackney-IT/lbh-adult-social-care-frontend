import { BASE_URL } from '../BaseApi';
import axios from 'axios';
import { handleError, handleResponse } from '../Utils/ApiUtils';

const NURSING_CARE_URL = `${BASE_URL}/v1/nursing-care-packages`;

const getTypeOfNursingHomeOptions = () => {
  return axios.get(`${NURSING_CARE_URL}/type-of-nursing-care-homes`)
    .then(handleResponse)
    .catch(handleError);
}

const getNursingCareTypeOfStayOptions = () => {
  return axios.get(`${NURSING_CARE_URL}/type-of-stay-options`)
    .then(handleResponse)
    .catch(handleError);
}

const createNursingCarePackage = (nursingCarePackageForCreation) => {
  const options = {
    url: `${NURSING_CARE_URL}`,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: nursingCarePackageForCreation
  };
  return axios(options)
    .then(handleResponse)
    .catch(handleError);
}

/*const updateNursingCarePackage = (nursingCarePackageId, nursingCarePackageForUpdate) => {
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
}*/

const getNursingCarePackageList = () => {
  return axios.get(`${NURSING_CARE_URL}/get-all`)
    .then(handleResponse)
    .catch(handleError);
}

const getSingleNursingCarePackage = (nursingCarePackageId) => {
  return axios.get(`${NURSING_CARE_URL}/${nursingCarePackageId}`)
    .then(handleResponse)
    .catch(handleError);
}

const getNursingCarePackageApprovalPackageContent = (nursingCarePackageId) => {
  return axios
    .get(`${NURSING_CARE_URL}/${nursingCarePackageId}/approve-package-contents`)
    .then(handleResponse)
    .catch(handleError);
};

const getNursingCarePackageApproveCommercial = (nursingCarePackageId) => {
  return axios
    .get(`${NURSING_CARE_URL}/${nursingCarePackageId}/approve-commercials`)
    .then(handleResponse)
    .catch(handleError);
};

const getNursingCarePackageApprovalHistory = (nursingCarePackageId) => {
  return axios
    .get(`${NURSING_CARE_URL}/approval-history/${nursingCarePackageId}`)
    .then(handleResponse)
    .catch(handleError);
};

const nursingCareRequestClarification = (
  nursingCarePackageId,
  informationText
) => {
  const options = {
    url: `${BASE_URL}/v1/nursing-care-request-more-information`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      nursingCarePackageId,
      informationText,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const nursingCareChangeStatus = (
  nursingCarePackageId,
  newStatusId
) => {
  const options = {
    url: `${NURSING_CARE_URL}/${nursingCarePackageId}/change-status/${newStatusId}`,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      nursingCarePackageId,
      newStatusId,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

export {
  getTypeOfNursingHomeOptions,
  getNursingCareTypeOfStayOptions,
  createNursingCarePackage,
  getNursingCarePackageList,
  getSingleNursingCarePackage,
  getNursingCarePackageApprovalPackageContent,
  getNursingCarePackageApproveCommercial,
  getNursingCarePackageApprovalHistory,
  nursingCareRequestClarification,
  nursingCareChangeStatus
}
