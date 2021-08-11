import useSWR from 'swr';
import fetcher from '../fetcher';
import useErrorNotification from '../useErrorNotification';

const customFetcher = (url, DateFrom, DateTo, PackageTypeId, ServiceUserId, SupplierId, WaitingOnId) =>
  fetcher(url, {
    params: { DateFrom, DateTo, PackageTypeId, ServiceUserId, SupplierId, WaitingOnId },
  });

const useHeldInvoicePayments = (params = {}) => {
  const { dateRange = '', serviceType, serviceUser, supplier, waitingOn } = params;
  const [dateFrom, dateTo] = dateRange.split(' - ');

  const { data, mutate, error } = useSWR(
    ['/transactions/invoices/held-invoice-payments', dateFrom, dateTo, serviceType, serviceUser, supplier, waitingOn],
    customFetcher,
    {
      initialData: {
        pagingMetaData: {},
        data: [],
      },
    }
  );

  useErrorNotification(error, 'Can not get hold payments');

  return { data, mutate };
};

export default useHeldInvoicePayments;
