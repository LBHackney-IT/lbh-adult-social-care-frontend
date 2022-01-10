import useSWR from 'swr';
import useErrorNotification from './useErrorNotification';
import fetcher from './fetcher';

const fetchWithParams = (url, params) => fetcher(url, { params });

export const useFetchWithParams = ({
  params = {},
  url,
  shouldFetch = true,
  errorText = 'Request fail',
  initialData = {
    data: [],
    pagingMetaData: {},
  },
}) => {
  const response = useSWR(shouldFetch ? [url, params] : null, fetchWithParams);
  const { error, data } = response;

  useErrorNotification(response.error, errorText);

  return {
    ...response,
    data: data || initialData,
    isLoading: !error && !data && shouldFetch,
  };
};
