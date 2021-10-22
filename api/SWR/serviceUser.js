import useSWR from 'swr';
import useErrorNotification from './useErrorNotification';
import useGetData from './useGetData';
import searchFetch from './searchFetch';

export const useServiceUser = (hackneyId) =>
  useGetData(hackneyId ? `/service-user/${hackneyId}` : null, 'Can not get service user', {});

export const useServiceUserSearch = ({ params, shouldFetch }) => {
  const response = useSWR(shouldFetch ? ['/service-user/search', params] : null, searchFetch);
  const { error, data } = response;

  useErrorNotification(response.error, 'Can not get service user');

  return {
    ...response,
    data: data || {
      data: [],
      pagingMetaData: {},
    },
    isLoading: !error && !data && shouldFetch,
  };
};

export const useServiceUserMasterSearch = ({ params, shouldFetch }) => {
  const response = useSWR(shouldFetch ? ['/service-user/master-search', params] : null, searchFetch);
  const { error, data } = response;

  useErrorNotification(error, 'Can not get service user');

  return {
    ...response,
    data: data || { residents: [] },
    isLoading: !error && !data && shouldFetch,
  };
};
