import { axiosRequest } from '../Utils/ApiUtils';
import { requestMethods } from '../../constants/variables';
import { BASE_URL } from '../BaseApi';

const CARE_PACKAGE_URL = `${BASE_URL}/v1/care-packages`;

const submitCarePackage = ({ data, packageId }) => {
  const url = `${CARE_PACKAGE_URL}/${packageId}/submit`;
  return axiosRequest({ url, data, method: requestMethods.post });
};

export { submitCarePackage };
