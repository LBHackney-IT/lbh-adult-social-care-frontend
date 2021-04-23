import { BASE_URL } from '../BaseApi';
import { handleError, handleResponse } from '../Utils/ApiUtils';
import axios from 'axios';

const DAY_CARE_URL = `${BASE_URL}/v1/day-care-packages`;

const getTermTimeConsiderationOptions = () => {
  return axios.get(`${DAY_CARE_URL}/term-time-considerations`)
    .then(handleResponse)
    .catch(handleError);
}

const getOpportunitiesLengthOptions = () => {
  return axios.get(`${DAY_CARE_URL}/opportunity-length-options`)
    .then(handleResponse)
    .catch(handleError);
}

const getOpportunityTimesPerMonthOptions = () => {
  return axios.get(`${DAY_CARE_URL}/opportunity-times-per-month-options`)
    .then(handleResponse)
    .catch(handleError);
}

const createDayCarePackage = (dayCarePackageForCreation) => {
  const options = {
    url: `${DAY_CARE_URL}`,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: dayCarePackageForCreation
  };
  return axios(options)
    .then(handleResponse)
    .catch(handleError);
}

const updateDayCarePackage = (dayCarePackageId, dayCarePackageForUpdate) => {
  const options = {
    url: `${DAY_CARE_URL}/${dayCarePackageId}`,
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: dayCarePackageForUpdate
  };
  return axios(options)
    .then(handleResponse)
    .catch(handleError);
}

const getDayCarePackageList = () => {
  return axios.get(`${DAY_CARE_URL}`)
    .then(handleResponse)
    .catch(handleError);
}

const getSingleDayCarePackage = (dayCarePackageId) => {
  return axios.get(`${DAY_CARE_URL}/${dayCarePackageId}`)
    .then(handleResponse)
    .catch(handleError);
}

export {
  getTermTimeConsiderationOptions,
  getOpportunitiesLengthOptions,
  getOpportunityTimesPerMonthOptions,
  createDayCarePackage,
  updateDayCarePackage,
  getDayCarePackageList,
  getSingleDayCarePackage
};
