import useGetData from '../useGetData';

const CARE_PACKAGES_URL = '/care-packages';

const useReclaimApi = {
  fnc: (carePackageId) => useGetData(`${CARE_PACKAGES_URL}/${carePackageId}/reclaims/fnc`),
  activeFncPrice: (carePackageId) =>useGetData(`${CARE_PACKAGES_URL}/${carePackageId}/reclaims/fnc/active-price`),
}

export default useReclaimApi;