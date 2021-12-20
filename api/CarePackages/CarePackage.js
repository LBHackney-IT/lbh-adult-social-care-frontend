import { axiosRequest } from '../Utils/ApiUtils';
import { BASE_URL } from '../BaseApi';
import { requestMethods } from '../../constants/variables';

const CARE_PACKAGE_URL = `${BASE_URL}/v1/care-packages`;

const sendCarePackageRequest = (url = '', data, method = requestMethods.post) =>
  axiosRequest({ url: `${CARE_PACKAGE_URL}/${url}`, data, method });

const sendCarePackageRequestNoData = (url, method = requestMethods.post) =>
  axiosRequest({ url: `${CARE_PACKAGE_URL}/${url}`, method });

export const changeCarePackageDetails = ({ data, packageId }) =>
  sendCarePackageRequest(`${packageId}/details`, data, requestMethods.put);

export const submitCarePackage = ({ data, packageId }) => sendCarePackageRequest(`${packageId}/submit`, data);

export const approveCarePackage = (packageId, notes) => sendCarePackageRequest(`${packageId}/approve`, { notes });

export const declineCarePackage = (packageId, notes) => sendCarePackageRequest(`${packageId}/decline`, { notes });

export const endCarePackage = ({ packageId, notes, endDate }) =>
  sendCarePackageRequest(`${packageId}/end`, { notes, endDate });

export const cancelCarePackage = (packageId, notes) => sendCarePackageRequest(`${packageId}/cancel`, { notes });

export const createCoreCarePackage = ({ data }) => sendCarePackageRequest('', data);

export const updateCoreCarePackage = ({ data, packageId }) =>
  axiosRequest({
    url: `${CARE_PACKAGE_URL}/${packageId}`,
    data,
    method: requestMethods.put,
    'Content-Type': 'multipart/form-data',
  });

export const updateCarePackageCosts = ({ data, packageId }) =>
  sendCarePackageRequest(`${packageId}/details`, data, requestMethods.put);

export const assignToBroker = ({ data }) =>
  axiosRequest({
    url: `${CARE_PACKAGE_URL}/assign`,
    data, method: requestMethods.post,
    'Content-Type': 'multipart/form-data',
  });

export const confirmS117 = ({ packageId }) =>
  sendCarePackageRequestNoData(`${packageId}/confirm-s117`, requestMethods.put);
