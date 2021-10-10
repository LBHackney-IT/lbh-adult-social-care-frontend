import useGetData from '../useGetData';
import { getQueryParamsFromObject } from '../../Utils/ApiUtils';

const CARE_PACKAGES_URL = '/care-packages';

const useCarePackageApi = {
  summary: (carePackageId) =>
    useGetData(carePackageId !== undefined ? `${CARE_PACKAGES_URL}/${carePackageId}/summary` : null),
  coreSettings: (carePackageId) =>
    useGetData(carePackageId !== undefined ? `${CARE_PACKAGES_URL}/${carePackageId}/core` : null),
  details: (packageId) => useGetData(packageId !== undefined ? `${CARE_PACKAGES_URL}/${packageId}/details` : null),
  suppliers: ({ supplierName }) => useGetData(`/suppliers${getQueryParamsFromObject({ supplierName })}`),
  singleSupplier: (supplierId) => useGetData(supplierId !== undefined ? `/suppliers/${supplierId}` : null),
};

export default useCarePackageApi;
