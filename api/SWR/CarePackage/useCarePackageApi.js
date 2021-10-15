import useGetData from '../useGetData';
import { getQueryParamsFromObject } from '../../Utils/ApiUtils';

const CARE_PACKAGES_URL = '/care-packages';

const useCarePackageApi = {
  summary: (carePackageId) =>
    useGetData(carePackageId !== undefined ? `${CARE_PACKAGES_URL}/${carePackageId}/summary` : null),

  brokerView: ({ pageNumber, toDate, fromDate, status, serviceUserId }) =>
    useGetData(
      `${CARE_PACKAGES_URL}/broker-view${getQueryParamsFromObject({
        pageNumber,
        status,
        toDate,
        fromDate,
        serviceUserId,
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
  serviceUser: ({ firstName, lastName, hackneyId, dateOfBirth, postcode, pageNumber }) => (
    useGetData(`/service-user${getQueryParamsFromObject({
      firstName,
      lastName,
      hackneyId,
      dateOfBirth,
      postcode,
      pageNumber,
    })}`, 'Can not get service user', { data: [], pagingMetaData: {}})
  ),
  singleSupplier: (supplierId) => useGetData(supplierId ? `/suppliers/${supplierId}` : null, '', {}),
  singlePackageInfo: (packageId) => useGetData(packageId ? `${CARE_PACKAGES_URL}/${packageId}` : null),
};

export default useCarePackageApi;
