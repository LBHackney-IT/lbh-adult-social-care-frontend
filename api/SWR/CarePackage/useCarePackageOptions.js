import useGetData from '../useGetData';

const CARE_PACKAGES_URL = '/care-packages';

const useCarePackageOptions = {
  packageSchedulingOptions: () => useGetData(`${CARE_PACKAGES_URL}/package-scheduling-options`),
  statuses: () => useGetData(
    `${CARE_PACKAGES_URL}/package-status-options`,
    'Can not get status options',
    []
  ),
};

export default useCarePackageOptions;
