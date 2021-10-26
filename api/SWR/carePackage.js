import { hasUrl } from '../../service';
import useGetData from './useGetData';
import { useFetchWithParams } from './useFetchWithParams';

const CARE_PACKAGES_URL = '/care-packages';

const getCarePackageUrl = (id, string = '') => hasUrl(id, `${CARE_PACKAGES_URL}${id ? `/${id}` : ''}${string}`);

export const useBrokerView = ({ params }) => (
  useFetchWithParams({
    params,
    url: `${CARE_PACKAGES_URL}/broker-view`,
    errorText: 'Can not get broker view'
  })
);

export const usePackageDetails = (packageId) =>
  useGetData(getCarePackageUrl(packageId, '/details'), '');

export const usePackageSchedulingOptions = () =>
  useGetData(`${CARE_PACKAGES_URL}/package-scheduling-options`, 'Can not get Scheduling options', []);

export const usePackageStatuses = () =>
  useGetData(`${CARE_PACKAGES_URL}/package-status-options`, 'Can not get status options', []);

export const usePackageSummary = (packageId) => useGetData(getCarePackageUrl(packageId, '/summary'));

export const useSinglePackageInfo = (packageId) => useGetData(getCarePackageUrl(packageId));

export const useSingleCorePackageInfo = (packageId) =>
  useGetData(packageId ? `${CARE_PACKAGES_URL}/${packageId}/core` : null, '');

export const usePackageHistory = (packageId) =>
  useGetData(getCarePackageUrl(packageId, '/history'), '');

export const usePackageFnc = (packageId) => useGetData(getCarePackageUrl(packageId, '/reclaims/fnc'));

export const usePackageActiveFncPrice = (packageId) =>
  useGetData(getCarePackageUrl(packageId, '/reclaims/fnc/active-price'));

export const usePackageCalculatedCost = (packageId, serviceUserId) =>
  useGetData(
    getCarePackageUrl(packageId, `/reclaims/care-charges/${serviceUserId}/default`),
    'Can not get calculated cost',
    0,
  );

export const usePackageCareCharge = (packageId) =>
  useGetData(getCarePackageUrl(packageId, '/reclaims/care-charges'));