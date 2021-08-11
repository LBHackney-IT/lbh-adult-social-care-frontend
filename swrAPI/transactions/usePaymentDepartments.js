import useSWR from 'swr';
import useErrorNotification from '../useErrorNotification';

const usePaymentDepartments = () => {
  const { data, error } = useSWR('/transactions/departments/payment-departments', {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    initialData: [],
  });

  useErrorNotification(error, 'Fail get Departments');

  return { data };
};

export default usePaymentDepartments;
