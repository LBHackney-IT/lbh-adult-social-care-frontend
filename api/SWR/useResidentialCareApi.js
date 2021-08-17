import useGetData from './useGetData'
import { mapTypeHomeOptions } from '../Mappers/ResidentialCareMapper'

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
};

export default useResidentialCareApi;