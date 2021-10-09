import { axiosRequest } from '../Utils/ApiUtils';
import { requestMethods } from '../../constants/variables';
import { BASE_URL } from '../BaseApi';

const CARE_PACKAGE_URL = `${BASE_URL}/v1/care-packages`;

const changeCarePackageDetails = ({ data, packageId }) => {
  const url = `${CARE_PACKAGE_URL}/${packageId}/details`;
  return axiosRequest({ url, data, method: requestMethods.put });
};

const submitCarePackage = ({ data, packageId }) => {
  const url = `${CARE_PACKAGE_URL}/${packageId}/submit`;
  return axiosRequest({ url, data, method: requestMethods.post });
};

const createCoreCarePackage = ({ data }) => {
  const url = `${CARE_PACKAGE_URL}`;
  return axiosRequest({ url, data, method: requestMethods.post });
};

const updateCoreCarePackage = ({ data, packageId }) => {
  console.log('acutal pid', packageId);
  const url = `${CARE_PACKAGE_URL}/${packageId}/details`;
  return axiosRequest({ url, data, method: requestMethods.put });
};

export { changeCarePackageDetails, submitCarePackage, createCoreCarePackage, updateCoreCarePackage };
