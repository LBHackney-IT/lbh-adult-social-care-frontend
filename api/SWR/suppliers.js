import useSWR from 'swr';
import searchFetch from './searchFetch';
import useErrorNotification from './useErrorNotification';

export const useSuppliers = ({ params, supplierId, shouldFetch }) => {
  const supplierIdUrl = supplierId ? `/${supplierId}` : '';
  const response = useSWR([`/suppliers${supplierIdUrl}`, params], searchFetch);
  const { error, data } = response;

  useErrorNotification(response.error, 'Can not get suppliers');

  return {
    ...response,
    data: data || {
      data: [],
      pagingMetaData: {},
    },
    isLoading: !error && !data && shouldFetch,
  };
};