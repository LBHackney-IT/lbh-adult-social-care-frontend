import { getQueryParamsFromObject } from 'api/Utils/ApiUtils';
import useGetData from '../useGetData';

const CARE_PACKAGES_URL = '/care-packages';

const useCarePackageApi = {
  summary: (carePackageId) =>
    useGetData(carePackageId !== undefined ? `${CARE_PACKAGES_URL}/${carePackageId}/summary` : null),

  brokerView: ({ pageNumber, toDate, fromDate, status, serviceUserName, brokerId }) =>
    useGetData(
      `${CARE_PACKAGES_URL}/broker-view${getQueryParamsFromObject({
        pageNumber,
        status,
        toDate,
        fromDate,
        serviceUserName,
        brokerId,
      })}`,
      '',
      {}
    ),

  details: (packageId) =>
    useGetData(packageId !== undefined ? `${CARE_PACKAGES_URL}/${packageId}/details` : null, '', {}),

  suppliers: ({ supplierName, shouldFetch }) =>
    useGetData(shouldFetch ? `/suppliers${getQueryParamsFromObject({ supplierName })}` : null),

  singleSupplier: (supplierId) => useGetData(supplierId ? `/suppliers/${supplierId}` : null, '', {}),
  singlePackageInfo: (packageId) => useGetData(packageId ? `${CARE_PACKAGES_URL}/${packageId}` : null, '', {}),
  history: (packageId) => useGetData(packageId ? `${CARE_PACKAGES_URL}/${packageId}/history` : null, '', {}),
};

export default useCarePackageApi;
