import useSWR from 'swr';
import useErrorNotification from './useErrorNotification';

// use for simple requests without any params
const useGetData = (url, errorMessage, initialData = {}) => {
  const response = useSWR(url !== undefined ? url : null, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
  const { error, data } = response;

  useErrorNotification(error, errorMessage);

  return {
    ...response,
    data: data || initialData,
    isLoading: error === undefined && data === undefined && !!url,
  };
};

export default useGetData;
