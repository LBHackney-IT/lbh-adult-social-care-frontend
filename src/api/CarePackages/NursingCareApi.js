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

export {
  getTypeOfNursingHomeOptions,
  getNursingCareTypeOfStayOptions
}
