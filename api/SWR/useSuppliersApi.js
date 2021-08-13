import useGetData from './useGetData';

const SUPPLIERS_URL = 'suppliers';

const useSuppliersApi = {
  supplierList: () => useGetData(`${SUPPLIERS_URL}/get-all`),
}

export default useSuppliersApi;