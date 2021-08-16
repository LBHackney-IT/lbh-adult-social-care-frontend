import useGetData from './useGetData'
import { mapNursingCareStageOptions } from '../Mappers/NursingCareMapper'

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
  detailsForBrokerage: (nursingCarePackageId, hascToken) => {
    useGetData(`${NURSING_CARE_URL}/${nursingCarePackageId}/brokerage`)
  },
  brokerageStages: () => {
    const propsData = useGetData(`${NURSING_CARE_URL}/stages`)
    const { data: stages } = propsData;
    const formatStages = mapNursingCareStageOptions(stages);
    return {
      ...propsData,
      data: formatStages,
    };
  },
}

export default useNursingCareApi;