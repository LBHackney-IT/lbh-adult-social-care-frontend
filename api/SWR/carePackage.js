import { useMemo } from 'react';
import useSWR from 'swr';
import fetcher from './fetcher';
import { useLookups } from './lookups';
import useGetData from './useGetData';
import { useFetchWithParams } from './useFetchWithParams';
import { getUrlOrNull } from '../Utils/FuncUtils';

const CARE_PACKAGES_URL = '/care-packages';

const getCarePackageUrl = (id, string = '') => getUrlOrNull(`${CARE_PACKAGES_URL}/${id}${string}`);

export const useBrokerView = ({ params }) =>
  useFetchWithParams({
    params,
    url: `${CARE_PACKAGES_URL}/broker-view`,
    errorText: 'Can not get broker view',
  });

export const useApprovals = ({ params, approverId, shouldFetch }) => {
  const approverIdUrl = approverId ? `/${approverId}` : '';

  return useFetchWithParams({
    params,
    shouldFetch,
    url: `${CARE_PACKAGES_URL}/approvals${approverIdUrl}`,
  });
};

export const usePackageDetails = (packageId) => useGetData(getCarePackageUrl(packageId, '/details'), '');

export const usePackageSchedulingOptions = () =>
  useGetData(`${CARE_PACKAGES_URL}/package-scheduling-options`, 'Can not get Scheduling options', []);

export const usePackageStatuses = () =>
  useGetData(`${CARE_PACKAGES_URL}/package-status-options`, 'Can not get status options', []);

export const usePackageSummary = (packageId) => useGetData(getCarePackageUrl(packageId, '/summary'));

export const useSingleCorePackageInfo = (packageId) =>
  useGetData(packageId ? `${CARE_PACKAGES_URL}/${packageId}/core` : null, '');

export const usePaymentHistoryView = ({ params, packageId }) =>
  useFetchWithParams({
    params,
    url: `${CARE_PACKAGES_URL}/${packageId}/payment-history`,
    errorText: 'Cannot get payment history',
  });

export const usePackageHistory = (packageId) => useGetData(getCarePackageUrl(packageId, '/history'), '');

export const usePackageFnc = (packageId) => useGetData(getCarePackageUrl(packageId, '/reclaims/fnc'));

export const usePackageActiveFncPrice = (packageId) =>
  useGetData(getCarePackageUrl(packageId, '/reclaims/fnc/active-price'));

export const usePackageCalculatedCost = (packageId, serviceUserId) =>
  useGetData(getCarePackageUrl(packageId, `/reclaims/care-charges/${serviceUserId}/default`), 'Cannot get cost', null);

// helper for usePackageCareCharge
const useGetActualReclaims = (reclaims) => {
  const { data: reclaimStatuses } = useLookups('reclaimStatus');

  const activeStatusId = reclaimStatuses.find((el) => el.name.toLowerCase() === 'active')?.id;
  const pendingStatusId = reclaimStatuses.find((el) => el.name.toLowerCase() === 'pending')?.id;

  return useMemo(() => {
    if (!reclaims) return null;
    return reclaims.filter((reclaim) => [activeStatusId, pendingStatusId].includes(reclaim.status));
  }, [reclaims, activeStatusId, pendingStatusId]);
};

export const useProvisionalCareCharges = (packageId) =>
  useGetData(getCarePackageUrl(packageId, '/reclaims/care-charges/provisional'));

export const usePackageCareCharges = (packageId) => useGetData(getCarePackageUrl(packageId, '/reclaims/care-charges'));

export const usePackageCareCharge = (packageId, subType) => {
  const response = useSWR(
    packageId ? [getCarePackageUrl(packageId, '/reclaims/care-charges'), subType] : null,
    (url, subTypeParam) => fetcher(url, { params: { subType: subTypeParam } })
  );
  const { error, data } = response;

  const actualReclaims = useGetActualReclaims(data);

  return {
    ...response,
    data: data ?? [],
    actualReclaims,
    isLoading: !error && !data && packageId,
  };
};

export const useAssessmentCareCharges = (packageId) =>
  useGetData(getCarePackageUrl(packageId, '/reclaims/care-charges/assessment-details'));
