import axios from 'axios';
import { BASE_URL } from '../BaseApi';
import { handleError, handleResponse } from '../Utils/ApiUtils';

const DAY_CARE_URL = `${BASE_URL}/v1/day-care-packages`;

const getTermTimeConsiderationOptions = () =>
  axios.get(`${DAY_CARE_URL}/term-time-considerations`).then(handleResponse).catch(handleError);

const getOpportunitiesLengthOptions = () =>
  axios.get(`${DAY_CARE_URL}/opportunity-length-options`).then(handleResponse).catch(handleError);

const getOpportunityTimesPerMonthOptions = () =>
  axios.get(`${DAY_CARE_URL}/opportunity-times-per-month-options`).then(handleResponse).catch(handleError);

const createDayCarePackage = (dayCarePackageForCreation) => {
  const options = {
    url: `${DAY_CARE_URL}`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: dayCarePackageForCreation,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const updateDayCarePackage = (dayCarePackageId, dayCarePackageForUpdate) => {
  const options = {
    url: `${DAY_CARE_URL}/${dayCarePackageId}`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: dayCarePackageForUpdate,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const getDayCarePackageList = () => axios.get(`${DAY_CARE_URL}`).then(handleResponse).catch(handleError);

const getSingleDayCarePackage = (dayCarePackageId) =>
  axios.get(`${DAY_CARE_URL}/${dayCarePackageId}`).then(handleResponse).catch(handleError);

const getDayCarePackageApprovalDetails = (dayCarePackageId) =>
  axios.get(`${DAY_CARE_URL}/${dayCarePackageId}/approval-details`).then(handleResponse).catch(handleError);

const changeDayCarePackageStatus = (dayCarePackageId, newStatusId) => {
  const options = {
    url: `${DAY_CARE_URL}/${dayCarePackageId}/change-status/${newStatusId}`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const approveDayCarePackageContents = (dayCarePackageId) => {
  const options = {
    url: `${DAY_CARE_URL}/${dayCarePackageId}/change-status/approve-package-contents`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const dayCarePackageApproveCommercials = (dayCarePackageId) => {
  const options = {
    url: `${DAY_CARE_URL}/${dayCarePackageId}/change-status/approve-brokered-deal`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const dayCarePackageRejectContents = (dayCarePackageId) => {
  const options = {
    url: `${DAY_CARE_URL}/${dayCarePackageId}/change-status/reject-package-contents`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const dayCarePackageRejectCommercials = (dayCarePackageId) => {
  const options = {
    url: `${DAY_CARE_URL}/${dayCarePackageId}/change-status/reject-package-commercials`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const dayCarePackageContentsRequestClarification = (dayCarePackageId, informationText) => {
  const options = {
    url: `${DAY_CARE_URL}/${dayCarePackageId}/change-status/package-details-request-more-information`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      informationText,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const dayCarePackageCommercialsRequestClarification = (dayCarePackageId, informationText) => {
  const options = {
    url: `${DAY_CARE_URL}/${dayCarePackageId}/change-status/package-brokerage-request-more-information`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      informationText,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

// Day care colleges
const getDayCareColleges = () => axios.get(`${DAY_CARE_URL}/colleges`).then(handleResponse).catch(handleError);
const createDayCareCollege = (dayCareCollegeForCreation) => {
  const options = {
    url: `${DAY_CARE_URL}/colleges`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: dayCareCollegeForCreation,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

// Day care brokerage
const getDayCareBrokerageStages = () =>
  axios.get(`${DAY_CARE_URL}/brokerage/stages`).then(handleResponse).catch(handleError);

const getDayCarePackageDetailsForBrokerage = (dayCarePackageId) =>
  axios.get(`${DAY_CARE_URL}/${dayCarePackageId}/brokerage`).then(handleResponse).catch(handleError);

const createDayCareBrokerageInfo = (dayCarePackageId, dayCareBrokerageInfoForCreation) => {
  const options = {
    url: `${DAY_CARE_URL}/${dayCarePackageId}/brokerage`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: dayCareBrokerageInfoForCreation,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const createDayCarePackageReclaim = (dayCarePackageId, dayCarePackageReclaimForCreation) => {
  const options = {
    url: `${DAY_CARE_URL}/${dayCarePackageId}/brokerage`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: dayCarePackageReclaimForCreation,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

export {
  getTermTimeConsiderationOptions,
  getOpportunitiesLengthOptions,
  getOpportunityTimesPerMonthOptions,
  getDayCareColleges,
  createDayCareCollege,
  createDayCarePackage,
  updateDayCarePackage,
  getDayCarePackageList,
  getSingleDayCarePackage,
  getDayCarePackageApprovalDetails,
  changeDayCarePackageStatus,
  approveDayCarePackageContents,
  dayCarePackageApproveCommercials,
  dayCarePackageContentsRequestClarification,
  dayCarePackageCommercialsRequestClarification,
  dayCarePackageRejectContents,
  dayCarePackageRejectCommercials,
  getDayCareBrokerageStages,
  getDayCarePackageDetailsForBrokerage,
  createDayCareBrokerageInfo,
  createDayCarePackageReclaim,
};
