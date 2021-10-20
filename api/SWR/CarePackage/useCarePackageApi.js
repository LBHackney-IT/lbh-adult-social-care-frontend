import useGetData from '../useGetData';
import { getQueryParamsFromObject } from '../../index';

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
};

export default useCarePackageApi;
