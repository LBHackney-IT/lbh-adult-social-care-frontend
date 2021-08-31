import useGetData from '../useGetData';

const INVOICES_URL = '/transactions/invoices';

const useInvoiceStatusList = () =>
  useGetData(`${INVOICES_URL}/invoice-status-list`, 'Can not get all invoice statuses');


const useInvoicePaymentStatuses = () => useGetData(`${INVOICES_URL}/invoice-payment-statuses`);


export {
  useGetData,
  useInvoiceStatusList,
  useInvoicePaymentStatuses,
}