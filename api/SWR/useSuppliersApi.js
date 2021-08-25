import useGetData from './useGetData';
import optionsMapper from '../Mappers/optionsMapper';
import { initialPagingOptions } from '../../constants/variables';

const SUPPLIERS_URL = 'suppliers';

const useSuppliersApi = {
  supplierList: () => {
    const propsData = useGetData(`${SUPPLIERS_URL}/get-all`, '', initialPagingOptions);
    const { data: { data: supplierList }} = propsData;

    const formatSupplierList = optionsMapper({
      text: 'supplierName',
      value: 'id',
    }, [] || supplierList);

    return {
      ...propsData,
      data: {
        ...propsData.pagingMetaData,
        data: formatSupplierList
      },
    };
  },
}

export default useSuppliersApi;