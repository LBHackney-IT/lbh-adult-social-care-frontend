import { BASE_URL } from "../BaseApi";
import axios from "axios";
import { handleError, handleResponse } from "../Utils/ApiUtils";

const RESIDENTIAL_CARE_URL = `${BASE_URL}/v1/residential-care-packages`;

const getResidentialCareTypeOfStayOptions = () => {
  return axios
    .get(`${RESIDENTIAL_CARE_URL}/type-of-stay-options`)
    .then(handleResponse)
    .catch(handleError);
};

const getResidentialCareAdditionalNeedsCostOptions = () => {
  return [
    { text: "Weekly", value: 1 },
    { text: "One off", value: 2 },
    { text: "Fixed Period", value: 3 },
  ];
};

const getTypeOfResidentialCareHomeOptions = () => {
  return axios
    .get(`${RESIDENTIAL_CARE_URL}/type-of-residential-care-homes`)
    .then(handleResponse)
    .catch(handleError);
};

const createResidentialCarePackage = (residentialCarePackageForCreation) => {
  const options = {
    url: `${RESIDENTIAL_CARE_URL}`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: residentialCarePackageForCreation,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

/*const updateResidentialCarePackage = (residentialCarePackageId, residentialCarePackageForUpdate) => {
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
}*/

const getResidentialCarePackageList = () => {
  return axios
    .get(`${RESIDENTIAL_CARE_URL}/get-all`)
    .then(handleResponse)
    .catch(handleError);
};

const getSingleResidentialCarePackage = (residentialCarePackageId) => {
  return axios
    .get(`${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}`)
    .then(handleResponse)
    .catch(handleError);
};

const getResidentialCarePackageApprovalPackageContent = (residentialCarePackageId) => {
  return axios
    .get(`${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}/approve-package-contents`)
    .then(handleResponse)
    .catch(handleError);
};

const getResidentialCarePackageApproveBrokered = (residentialCarePackageId) => {
  return axios
    .get(`${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}/approve-brokered-deal`)
    .then(handleResponse)
    .catch(handleError);
};

const getResidentialCarePackageApprovalHistory = (residentialCarePackageId) => {
  return axios
    .get(`${RESIDENTIAL_CARE_URL}/approval-history/${residentialCarePackageId}`)
    .then(handleResponse)
    .catch(handleError);
};

const residentialCareRequestClarification = (
  residentialCarePackageId,
  informationText
) => {
  const options = {
    url: `${BASE_URL}/v1/residential-care-request-more-information`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      residentialCarePackageId,
      informationText,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const residentialCareChangeStatus = (
  residentialCarePackageId,
  newStatusId
) => {
  const options = {
    url: `${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}/change-status/${newStatusId}`,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      residentialCarePackageId,
      newStatusId,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

// Residential care brokerage
const getResidentialCareBrokerageStages = () => {
  return axios
    .get(`${BASE_URL}/v1/stages`)
    .then(handleResponse)
    .catch(handleError);
};

const getResidentialCarePackageDetailsForBrokerage = (residentialCarePackageId) => {
  return axios
    .get(`${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}/brokerage`)
    .then(handleResponse)
    .catch(handleError);
};

const createResidentialCareBrokerageInfo = (
  residentialCarePackageId,
  residentialCareBrokerageInfoForCreation
) => {
  const options = {
    url: `${RESIDENTIAL_CARE_URL}/${residentialCarePackageId}/brokerage`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: residentialCareBrokerageInfoForCreation,
  };
  return axios(options).then(handleResponse).catch(handleError);
};


export {
  getResidentialCareTypeOfStayOptions,
  getResidentialCareAdditionalNeedsCostOptions,
  getTypeOfResidentialCareHomeOptions,
  createResidentialCarePackage,
  getResidentialCarePackageList,
  getSingleResidentialCarePackage,
  getResidentialCarePackageApprovalPackageContent,
  getResidentialCarePackageApproveBrokered,
  getResidentialCarePackageApprovalHistory,
  residentialCareRequestClarification,
  residentialCareChangeStatus,
  getResidentialCareBrokerageStages,
  getResidentialCarePackageDetailsForBrokerage,
  createResidentialCareBrokerageInfo,
};
