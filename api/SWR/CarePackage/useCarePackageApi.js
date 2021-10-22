import { getQueryParamsFromObject } from '../../Utils/ApiUtils';
import useGetData from '../useGetData';

const CARE_PACKAGES_URL = '/care-packages';

const getCarePackageUrl = (endpoint = '') => (packageId) =>
  useGetData(
    packageId !== undefined ? `${CARE_PACKAGES_URL}/${packageId}${endpoint}` : null,
    '',
    {}
  );

const useCarePackageApi = {
  summary: getCarePackageUrl('/summary'),

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

  details: getCarePackageUrl('/details'),

  suppliers: ({ supplierName, shouldFetch }) =>
    useGetData(shouldFetch ? `/suppliers${getQueryParamsFromObject({ supplierName })}` : null),

  singleSupplier: (supplierId) => useGetData(supplierId ? `/suppliers/${supplierId}` : null, '', {}),
  singlePackageInfo: getCarePackageUrl(),
  singleCorePackageInfo: getCarePackageUrl('/core'),
  history: getCarePackageUrl('/history'),
};

export default useCarePackageApi;
