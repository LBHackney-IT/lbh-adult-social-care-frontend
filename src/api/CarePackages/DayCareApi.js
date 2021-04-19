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

export {
  getTermTimeConsiderationOptions,
  getOpportunitiesLengthOptions,
  getOpportunityTimesPerMonthOptions
};
