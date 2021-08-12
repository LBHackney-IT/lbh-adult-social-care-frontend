import useSWR from 'swr';
import fetcher from '../fetcher';
import useErrorNotification from '../useErrorNotification';

const customFetcher = (url, dateFrom, dateTo, packageTypeId, serviceUserId, supplierId, waitingOnId) =>
  fetcher(url, {
    params: { dateFrom, dateTo, packageTypeId, serviceUserId, supplierId, waitingOnId },
  });

const useHeldInvoicePayments = ({ params = {}, shouldFetch }) => {
  const { dateRange = '', serviceType, serviceUser, supplier, waitingOn } = params;
  const [dateFrom, dateTo] = dateRange.split(' - ');

  const { data, mutate, error } = useSWR(
    shouldFetch
      ? [
          '/transactions/invoices/held-invoice-payments',
          dateFrom,
          dateTo,
          serviceType,
          serviceUser,
          supplier,
          waitingOn,
        ]
      : null,
    customFetcher,
    {
      initialData: {
        pagingMetaData: {},
        data: [],
      },
    }
  );

  useErrorNotification(error, `Can not get hold payments. ${error ?? ''}`);

  return { data, mutate };
};

export default useHeldInvoicePayments;
