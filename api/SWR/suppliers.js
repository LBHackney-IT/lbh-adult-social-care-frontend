import { useFetchParams } from './useFetchParams';

export const useSuppliers = ({ params, supplierId, shouldFetch }) => {
  const supplierIdUrl = supplierId ? `/${supplierId}` : '';

  return useFetchParams({
    params,
    shouldFetch,
    url: `/suppliers${supplierIdUrl}`
  });
};