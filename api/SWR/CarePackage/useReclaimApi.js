import useGetData from '../useGetData';

const CARE_PACKAGES_URL = '/care-packages';

const useReclaimApi = {
  fnc: (carePackageId) =>
    useGetData(carePackageId !== undefined ? `${CARE_PACKAGES_URL}/${carePackageId}/reclaims/fnc` : null),
  activeFncPrice: (carePackageId) =>
    useGetData(carePackageId !== undefined ? `${CARE_PACKAGES_URL}/${carePackageId}/reclaims/fnc/active-price` : null),
};

export default useReclaimApi;
