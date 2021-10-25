import { requestMethods } from 'constants/variables';
import { axiosRequest, BASE_URL } from '../index';

const CARE_PACKAGE_URL = `${BASE_URL}/v1/care-packages`;

const sendCarePackageRequest = (url, data, method = requestMethods.post) =>
  axiosRequest({ url: `${CARE_PACKAGE_URL}/${url}`, data, method });

export const changeCarePackageDetails = ({ data, packageId }) =>
  sendCarePackageRequest(`${packageId}/details`, data, requestMethods.put)

export const submitCarePackage = ({ data, packageId }) => sendCarePackageRequest(`${packageId}/submit`, data)

export const approveCarePackage = ({ data, packageId }) => sendCarePackageRequest(`${packageId}/approve`, data)

export const endCarePackage = ({ data, packageId }) => sendCarePackageRequest(`${packageId}/end`, data)

export const declineCarePackage = ({ data, packageId }) => sendCarePackageRequest(`${packageId}/decline`, data)

export const cancelCarePackage = ({ data, packageId }) => sendCarePackageRequest(`${packageId}/cancel`, data)

export const createCoreCarePackage = ({ data }) => sendCarePackageRequest('', data)

export const updateCoreCarePackage = ({ data, packageId }) =>
  sendCarePackageRequest(`${packageId}`, data, requestMethods.put)

export const updateCarePackageCosts = ({ data, packageId }) =>
  sendCarePackageRequest(`${packageId}/details`, data, requestMethods.put)

export const assignToBroker = ({ data }) => sendCarePackageRequest('/assign', data)