import { BASE_URL } from '../BaseApi';
import { handleError, handleResponse } from '../Utils/ApiUtils';

const DAY_CARE_URL = `${BASE_URL}/v1/day-care-packages`;

const getTermTimeConsiderationOptions = () => {
  return fetch(`${DAY_CARE_URL}/term-time-considerations`)
    .then(handleResponse)
    .catch(handleError);
}

const getOpportunitiesLengthOptions = () => {
  return fetch(`${DAY_CARE_URL}/opportunity-length-options`)
    .then(handleResponse)
    .catch(handleError);
}

const getOpportunityTimesPerMonthOptions = () => {
  return fetch(`${DAY_CARE_URL}/opportunity-times-per-month-options`)
    .then(handleResponse)
    .catch(handleError);
}

const createDayCarePackage = (dayCarePackageForCreation) => {
  return fetch(`${DAY_CARE_URL}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dayCarePackageForCreation)
  })
    .then(handleResponse)
    .catch(handleError);
}

const updateDayCarePackage = (dayCarePackageId, dayCarePackageForUpdate) => {
  return fetch(`${DAY_CARE_URL}/${dayCarePackageId}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dayCarePackageForUpdate)
  })
    .then(handleResponse)
    .catch(handleError);
}

const getDayCarePackageList = () => {
  return fetch(`${DAY_CARE_URL}`)
    .then(handleResponse)
    .catch(handleError);
}

const getSingleDayCarePackage = (dayCarePackageId) => {
  return fetch(`${DAY_CARE_URL}/${dayCarePackageId}`)
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
