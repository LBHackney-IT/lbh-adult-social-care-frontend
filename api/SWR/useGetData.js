import useSWR from 'swr';
import useErrorNotification from './useErrorNotification';

// use for simple requests without any params
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
