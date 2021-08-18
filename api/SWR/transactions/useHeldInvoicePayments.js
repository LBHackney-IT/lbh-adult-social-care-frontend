import useGetData from '../useGetData'
import { getQueryParamsFromObject } from '../../Utils/ApiUtils'

const useHeldInvoicePayments = (params, shouldFetch) => {
  const initialData = {
    pagingMetaData: {},
    data: [],
  };

  if(!shouldFetch) {
    return { data: initialData };
  }

  const { dateFrom, dateTo, pageSize = 10, serviceType, pageNumber = 1, serviceUser, supplier, waitingOn } = params;

  const dataProps = useGetData(`/transactions/invoices/held-invoice-payments${getQueryParamsFromObject({
    dateFrom: dateFrom?.getDate ? dateFrom.toJSON() : '',
    dateTo: dateTo?.getDate ? dateTo.toJSON() : '',
    pageNumber,
    pageSize,
    serviceType,
    serviceUser,
    supplier,
    waitingOn,
  })}`);

  return { ...dataProps, data: dataProps.data?.data ? dataProps.data : initialData };
};

export default useHeldInvoicePayments;
