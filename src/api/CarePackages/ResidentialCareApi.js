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

export {
  getResidentialCareTypeOfStayOptions,
  getResidentialCareAdditionalNeedsCostOptions,
  getTypeOfResidentialCareHomeOptions,
  createResidentialCarePackage,
  getResidentialCarePackageList,
  getSingleResidentialCarePackage,
};
