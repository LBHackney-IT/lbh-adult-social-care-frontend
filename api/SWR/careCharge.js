import useSWR from 'swr';
import searchFetch from './searchFetch';
import useErrorNotification from './useErrorNotification';

export const useCareCharge = ({ params, shouldFetch }) => {
  const response = useSWR(['/care-charges', params], searchFetch);
  const { error, data } = response;

  useErrorNotification(response.error, 'Can not get care charges');

  return {
    ...response,
    data: data || {
      data: [],
      pagingMetaData: {},
    },
    isLoading: !error && !data && shouldFetch,
  };
};