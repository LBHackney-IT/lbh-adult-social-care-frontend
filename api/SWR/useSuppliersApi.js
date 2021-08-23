import useGetData from './useGetData';
import optionsMapper from '../Mappers/optionsMapper'

const SUPPLIERS_URL = 'suppliers';

const useSuppliersApi = {
  supplierList: () => {
    const propsData = useGetData(`${SUPPLIERS_URL}/get-all`);
    const { data: supplierList } = propsData;

    const formatSupplierList = optionsMapper({
      text: 'supplierName',
      value: 'id',
    }, supplierList);

    return {
      ...propsData,
      data: formatSupplierList,
    };
  },
}

export default useSuppliersApi;