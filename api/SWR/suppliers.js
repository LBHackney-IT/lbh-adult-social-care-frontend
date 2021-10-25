import { useFetchWithParams } from './useFetchWithParams';

export const useSuppliers = ({ params, supplierId, shouldFetch }) => {
  const supplierIdUrl = supplierId ? `/${supplierId}` : '';

  return useFetchWithParams({
    params,
    shouldFetch,
    url: `/suppliers${supplierIdUrl}`
  });
};