import useGetData from './useGetData'
import { mapResidentialCareStageOptions, mapTypeHomeOptions } from '../Mappers/ResidentialCareMapper'

const RESIDENTIAL_CARE_URL = 'residential-care-packages';

const useResidentialCareApi = {
  homeTypeOptions: () => {
    const propsData = useGetData(`${RESIDENTIAL_CARE_URL}/type-of-residential-care-homes`)
    const { data: typeHomeOptions } = propsData;
    return {
      ...propsData,
      data: mapTypeHomeOptions(typeHomeOptions),
    };
  },
  brokerageStages: () => {
    const propsData = useGetData(`${RESIDENTIAL_CARE_URL}/stages`);
    const { data: stages } = propsData;
    return {
      ...propsData,
      data: mapResidentialCareStageOptions(stages),
    };
  },
};

export default useResidentialCareApi;