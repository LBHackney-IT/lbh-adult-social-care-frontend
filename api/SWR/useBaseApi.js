import useGetData from './useGetData'
import optionsMapper from '../Mappers/optionsMapper'

const useBaseApi = {
  stages: () => {
    const propsData = useGetData('/stages')
    const { data: stages } = propsData;
    const formatStages = optionsMapper({
      text: 'stageName',
      value: 'id',
    }, stages);
    return {
      ...propsData,
      data: formatStages,
    };
  },
};

export default useBaseApi;