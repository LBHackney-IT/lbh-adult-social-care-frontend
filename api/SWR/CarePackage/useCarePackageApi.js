import useGetData from '../useGetData';
import { getQueryParamsFromObject } from '../../Utils/ApiUtils';

const CARE_PACKAGES_URL = '/care-packages';

const useCarePackageApi = {
  summary: (carePackageId) =>
    useGetData(carePackageId !== undefined ? `${CARE_PACKAGES_URL}/${carePackageId}/summary` : null),
  details: (packageId) => useGetData(packageId !== undefined ? `${CARE_PACKAGES_URL}/${packageId}/details` : null),
  suppliers: ({ supplierName }) => useGetData(`/suppliers${getQueryParamsFromObject({ supplierName })}`),
};

export default useCarePackageApi;
