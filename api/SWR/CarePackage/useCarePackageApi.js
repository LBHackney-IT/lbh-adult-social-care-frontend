import useGetData from '../useGetData';

const CARE_PACKAGES_URL = '/care-packages';

const useCarePackageApi = {
  summary: (carePackageId) => useGetData(`${CARE_PACKAGES_URL}/${carePackageId}/summary`),
  details: (packageId) => useGetData(`${CARE_PACKAGES_URL}/${packageId}/details`),
}

export default useCarePackageApi;