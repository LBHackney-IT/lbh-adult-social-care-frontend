import useGetData from '../useGetData';
import { getQueryParamsFromObject } from '../../Utils/ApiUtils';

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

  coreSettings: (carePackageId) =>
    useGetData(
      carePackageId !== undefined || carePackageId !== 'undefined' ? `${CARE_PACKAGES_URL}/${carePackageId}/core` : null
    ),

  details: (packageId) =>
    useGetData(packageId !== undefined ? `${CARE_PACKAGES_URL}/${packageId}/details` : null, '', {}),
  suppliers: ({ supplierName }) => useGetData(`/suppliers${getQueryParamsFromObject({ supplierName })}`),
  singleSupplier: (supplierId) => useGetData(supplierId ? `/suppliers/${supplierId}` : null, '', {}),
  singlePackageInfo: (packageId) => {
    const response = useGetData(packageId ? `${CARE_PACKAGES_URL}/${packageId}` : null)
    return { ...response, singlePackageInfo: !!response.data};
  },
};

export default useCarePackageApi;
