import useGetData from './useGetData';
import { useFetchWithParams } from './useFetchWithParams';

const CARE_PACKAGES_URL = '/care-packages';

export const useBrokerView = ({ params }) => (
  useFetchWithParams({
    params,
    url: `${CARE_PACKAGES_URL}/broker-view`,
    errorText: 'Can not get broker view'
  })
);

export const usePackageDetails = (packageId) =>
  useGetData(packageId !== undefined ? `${CARE_PACKAGES_URL}/${packageId}/details` : null, '');

export const usePackageSchedulingOptions = () =>
  useGetData(`${CARE_PACKAGES_URL}/package-scheduling-options`, 'Can not get Scheduling options', []);

export const usePackageStatuses = () =>
  useGetData(`${CARE_PACKAGES_URL}/package-status-options`, 'Can not get status options', []);

export const usePackageSummary = (carePackageId) =>
  useGetData(carePackageId !== undefined ? `${CARE_PACKAGES_URL}/${carePackageId}/summary` : null);

export const useSinglePackageInfo = (packageId) =>
  useGetData(packageId ? `${CARE_PACKAGES_URL}/${packageId}` : null, '');

export const useSingleCorePackageInfo = (packageId) =>
  useGetData(packageId ? `${CARE_PACKAGES_URL}/${packageId}/core` : null, '');

export const usePackageHistory = (packageId) =>
  useGetData(packageId ? `${CARE_PACKAGES_URL}/${packageId}/history` : null, '');

export const usePackageFnc = (carePackageId) =>
  useGetData(carePackageId !== undefined ? `${CARE_PACKAGES_URL}/${carePackageId}/reclaims/fnc` : null);

export const usePackageActiveFncPrice = (carePackageId) =>
  useGetData(carePackageId !== undefined ? `${CARE_PACKAGES_URL}/${carePackageId}/reclaims/fnc/active-price` : null);

export const usePackageCalculatedCost = (carePackageId, serviceUserId) => {
  const url = `${CARE_PACKAGES_URL}/${carePackageId}/reclaims/care-charges/${serviceUserId}/default`;
  return useGetData(
    carePackageId !== undefined ? url : null,
    'Can not get calculated cost',
    0,
  );
};

export const usePackageCareCharge = (carePackageId) =>
  useGetData(carePackageId !== undefined ? `${CARE_PACKAGES_URL}/${carePackageId}/reclaims/care-charges` : null);