import { getQueryParamsFromObject } from '../../Utils/ApiUtils';
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

  careChargeList: ({ status, pageNumber, pageSize = 10, orderByDate, orderBy, modifiedBy }) =>
    useGetData(
      `/care-charges${getQueryParamsFromObject({
        modifiedBy,
        pageNumber,
        status,
        pageSize,
        orderBy,
        orderByDate
      })}`,
      'Can not get care charges',
      { data: [], pagingMetaData: {}}
    ),

  details: (packageId) =>
    useGetData(packageId !== undefined ? `${CARE_PACKAGES_URL}/${packageId}/details` : null, '', {}),

  suppliers: ({ supplierName, shouldFetch }) =>
    useGetData(shouldFetch ? `/suppliers${getQueryParamsFromObject({ supplierName })}` : null),

  singleSupplier: (supplierId) => useGetData(supplierId ? `/suppliers/${supplierId}` : null, '', {}),
  singlePackageInfo: (packageId) => useGetData(packageId ? `${CARE_PACKAGES_URL}/${packageId}` : null, '', {}),
  history: (packageId) => useGetData(packageId ? `${CARE_PACKAGES_URL}/${packageId}/history` : null, '', {}),
  serviceUser: ({ hackneyId }, shouldFetch) => (
    useGetData(shouldFetch ? `/service-user/${hackneyId}` : null, 'Can not get service user', {})
  ),
  serviceUserSearch: ({
    firstName,
    lastName,
    hackneyId,
    dateOfBirth,
    postcode,
    pageNumber,
    pageSize,
    orderBy
  }, shouldFetch) => (
    useGetData(shouldFetch ? `/service-user/search${getQueryParamsFromObject({
      firstName,
      lastName,
      hackneyId,
      dateOfBirth,
      postcode,
      pageNumber,
      pageSize,
      orderBy,
    })}` : null, 'Can not get service user', { data: [], pagingMetaData: {}})
  ),
  serviceUserMasterSearch: ({ firstName, lastName, hackneyId, dateOfBirth, postcode }, shouldFetch) => (
    useGetData(shouldFetch ? `/service-user/master-search${getQueryParamsFromObject({
      firstName,
      lastName,
      hackneyId,
      dateOfBirth,
      postcode,
    })}` : null, 'Can not get service user', { residents: [] })
  ),
};

export default useCarePackageApi;
