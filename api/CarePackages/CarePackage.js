import { axiosRequest, BASE_URL } from './../../api';
import { requestMethods } from '../../constants/variables';

const CARE_PACKAGE_URL = `${BASE_URL}/v1/care-packages`;

export const changeCarePackageDetails = ({ data, packageId }) => {
  const url = `${CARE_PACKAGE_URL}/${packageId}/details`;
  return axiosRequest({ url, data, method: requestMethods.put });
};

export const submitCarePackage = ({ data, packageId }) => {
  const url = `${CARE_PACKAGE_URL}/${packageId}/submit`;
  return axiosRequest({ url, data, method: requestMethods.post });
};

export const createCoreCarePackage = ({ data }) => {
  const url = `${CARE_PACKAGE_URL}`;
  return axiosRequest({ url, data, method: requestMethods.post });
};

export const updateCoreCarePackage = ({ data, packageId }) => {
  const url = `${CARE_PACKAGE_URL}/${packageId}`;
  return axiosRequest({ url, data, method: requestMethods.put });
};

export const updateCarePackageCosts = ({ data, packageId }) => {
  const url = `${CARE_PACKAGE_URL}/${packageId}/details`;
  return axiosRequest({ url, data, method: requestMethods.put });
};

export const assignToBroker = ({ data }) =>
  axiosRequest({
    url: `${CARE_PACKAGE_URL}/assign`,
    method: requestMethods.post,
    data,
  });
