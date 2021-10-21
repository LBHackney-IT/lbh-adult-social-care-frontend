import useGetData from '../useGetData';

const CARE_PACKAGES_URL = '/care-packages';

const useCarePackageOptions = {
  packageSchedulingOptions: () => useGetData(`${CARE_PACKAGES_URL}/package-scheduling-options`, 'Can not get Scheduling options', []),
  statuses: () => useGetData(`${CARE_PACKAGES_URL}/package-status-options`),
};

export default useCarePackageOptions;
