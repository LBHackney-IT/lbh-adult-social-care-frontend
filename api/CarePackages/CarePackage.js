import { axiosRequest } from '../Utils/ApiUtils';
import { requestMethods } from '../../constants/variables';
import { BASE_URL } from '../BaseApi';

const CARE_PACKAGE_URL = `${BASE_URL}/v1/care-package`;

const changeCarePackageDetails = ({ data, packageId }) => {
  const url = `${CARE_PACKAGE_URL}/${packageId}/details`;
  return axiosRequest({ url, data, method: requestMethods.put });
};

export {
  changeCarePackageDetails,
};