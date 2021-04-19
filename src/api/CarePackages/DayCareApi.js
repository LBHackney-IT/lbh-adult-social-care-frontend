import { BASE_URL } from '../BaseApi';
import { handleError, handleResponse } from '../Utils/ApiUtils';

const DAY_CARE_URL = `${BASE_URL}/v1/day-care-packages`;

const getTermTimeConsiderationOptions = () => {
  return fetch(`${DAY_CARE_URL}/term-time-considerations`)
    .then(handleResponse)
    .catch(handleError);
}

const getOpportunitiesLengthOptions = () => {
  return [
    { text: "45 minutes", value: 45 },
    { text: "1 hour", value: 60 },
    { text: "1 hour 15 minutes", value: 75 },
  ];
};

const getOpportunitiesTimePerMonthOptions = () => {
  return [
    { text: "Daily", value: 1 },
    { text: "Weekly", value: 2 },
    { text: "Monthly", value: 3 },
  ];
};

export {
  getTermTimeConsiderationOptions,
  getOpportunitiesLengthOptions,
  getOpportunitiesTimePerMonthOptions,
};
