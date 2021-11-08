import { useFetchWithParams } from './useFetchWithParams';
import useGetData from './useGetData';

export const useSuppliers = ({ params, shouldFetch }) =>
  useFetchWithParams({
    params,
    shouldFetch,
    url: '/suppliers'
  });

export const useSingleSupplier = (supplierId) =>
  useGetData(supplierId !== undefined ? `/suppliers/${supplierId}` : null);