import useSWR from 'swr';
import useErrorNotification from './useErrorNotification';

const useGetData = (url, errorMessage) => {
  const response = useSWR(url, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    initialData: [],
  });

  useErrorNotification(response.error, errorMessage);

  return response;
};

export default useGetData;
