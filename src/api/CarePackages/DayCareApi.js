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

const getOpportunitiesTimePerMonthOptions = () => {
  return [
    { text: "Daily", value: 1 },
    { text: "Weekly", value: 2 },
    { text: "Monthly", value: 3 },
  ];
};

export {
  getTermTimeConsiderationOptions,
  getOpportunitiesTimePerMonthOptions,
  getOpportunitiesLengthOptions
};
