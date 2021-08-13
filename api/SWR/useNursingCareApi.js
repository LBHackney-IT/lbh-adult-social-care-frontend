import useGetData from './useGetData'

const NURSING_CARE_URL = '/nursing-care-packages';

const useNursingCareApi = {
  typeOfNursingCareHomes: () => useGetData(`${NURSING_CARE_URL}/type-of-nursing-care-homes`),
  nursingCarePackageList: () => useGetData(`${NURSING_CARE_URL}/get-all`),
  singleNursingCarePackage: (nursingCarePackageId) => useGetData(`${NURSING_CARE_URL}/${nursingCarePackageId}`),
}

export default useNursingCareApi;