import useSWR from 'swr';
import searchFetch from './searchFetch';
import useErrorNotification from './useErrorNotification';

export const useFetchParams = ({
  params,
  url,
  shouldFetch = true,
  errorText = 'Response fail',
  initialData = {
    data: [],
    pagingMetaData: {},
  }
}) => {
  const response = useSWR(shouldFetch ? [url, params] : null, searchFetch);
  const { error, data } = response;

  useErrorNotification(response.error, errorText);

  return {
    ...response,
    data: data || initialData,
    isLoading: !error && !data && shouldFetch,
  };
};