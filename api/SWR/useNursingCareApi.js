import useGetData from './useGetData'

const NURSING_CARE_URL = '/nursing-care-packages';

const useNursingCareApi = {
  typeOfNursingCareHomes: () => {
    const propsData = useGetData(`${NURSING_CARE_URL}/type-of-nursing-care-homes`);
    const { data: typeOptions } = propsData;
    const options = typeOptions.map((option) => ({
      text: option.typeOfCareHomeName,
      value: option.typeOfCareHomeId,
    }));
    return {
      ...propsData,
      data: options,
    };
  },
  nursingCarePackageList: () => useGetData(`${NURSING_CARE_URL}/get-all`),
  singleNursingCarePackage: (nursingCarePackageId) => useGetData(`${NURSING_CARE_URL}/${nursingCarePackageId}`),
  typeOfStayOptions: () => useGetData(`${NURSING_CARE_URL}/type-of-stay-options`),
}

export default useNursingCareApi;