import useSWR from 'swr';
import useErrorNotification from '../useErrorNotification';

const useInvoiceStatusList = () => {
  const { data, error } = useSWR('/transactions/invoices/invoice-status-list', {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    initialData: [],
  });

  useErrorNotification(error, 'Can not get all invoice statuses');

  return { data };
};

export default useInvoiceStatusList;
