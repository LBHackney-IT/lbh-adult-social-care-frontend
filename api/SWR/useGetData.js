import useSWR from 'swr';
import useErrorNotification from './useErrorNotification';

// use for simple requests without any params
const useGetData = (url, errorMessage, initialData = []) => {
  const response = useSWR(url, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  useErrorNotification(response.error, errorMessage);

  return { ...response, data: response.data || initialData, isLoading: !response.error && !response.data && url };
};

export default useGetData;
