import useGetData from './useGetData';
import { mapBrokerageSupplierOptions } from '../Mappers/NursingCareMapper'

const SUPPLIERS_URL = 'suppliers';

const useSuppliersApi = {
  supplierList: () => {
    const propsData = useGetData(`${SUPPLIERS_URL}/get-all`);
    const { data: supplierList } = propsData;
    const formatSupplierList = mapBrokerageSupplierOptions(supplierList);
    return {
      ...propsData,
      data: formatSupplierList,
    };
  },
}

export default useSuppliersApi;