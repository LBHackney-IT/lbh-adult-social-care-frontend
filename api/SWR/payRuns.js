import { useFetchWithParams } from './useFetchWithParams';
import useGetData from './useGetData';
import { getUrlOrNull } from '../Utils/FuncUtils';

const PAY_RUNS_URL = '/payruns';
const getPayRunUrl = (payRunId, additionalString = '') =>
  getUrlOrNull(`${PAY_RUNS_URL}${payRunId ? `/${payRunId}` : ''}${additionalString}`);

export const usePayrunView = ({ params }) =>
  useFetchWithParams({
    params,
    url: `${PAY_RUNS_URL}`,
    errorText: 'Cannot get payrun list',
  });

export const useInvoiceListView = ({ payRunId, params }) =>
  useFetchWithParams({
    params,
    url: getPayRunUrl(payRunId),
    errorText: 'Cannot get invoice list',
  });

export const usePayRunInvoice = (payRunId, invoiceId) =>
  useGetData(getPayRunUrl(payRunId, `/invoices/${invoiceId}`))

export const getSinglePayrun = ({payRunId}) => useGetData(getPayRunUrl(payRunId));

export const getPayrunInsight = ({ payRunId }) => useGetData(`${PAY_RUNS_URL}/${payRunId}/insights`);

export const useLatestPayRunToDate = ({ payRunTypeId }) =>
  useGetData(
    getPayRunUrl(payRunTypeId, '/previous-pay-run-end-date'),
    'Cannot get latest pay run to date',
    null
  );

export const useReleasedInvoiceNumber = () =>
  useGetData(
    `${PAY_RUNS_URL}/released-invoice-count`,
    'Cannot get released invoice count',
    null
  );
