import useGetData from '../useGetData';
import { getQueryParamsFromObject } from '../../Utils/ApiUtils';

const CARE_PACKAGES_URL = '/care-packages';

const useCarePackageApi = {
  summary: (carePackageId) => useGetData(`${CARE_PACKAGES_URL}/${carePackageId}/summary`),
  details: (packageId) => useGetData(`${CARE_PACKAGES_URL}/${packageId}/details`),
  suppliers: ({ supplierName }) => useGetData(`/suppliers${getQueryParamsFromObject({ supplierName })}`),
}

export default useCarePackageApi;