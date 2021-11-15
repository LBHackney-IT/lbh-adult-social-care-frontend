import { useFetchWithParams } from './useFetchWithParams';
import useGetData from './useGetData';

const PAY_RUNS_URL = '/payruns';
const getPayRunUrl = (payRunId) => `${PAY_RUNS_URL}/${payRunId}`;

export const usePayrunView = ({ params }) =>
  useFetchWithParams({
    params,
    url: `${PAY_RUNS_URL}`,
    errorText: 'Can not get payrun list',
  });

export const useInvoiceListView = ({ payRunId, params }) =>
  useFetchWithParams({
    params,
    url: getPayRunUrl(payRunId),
    errorText: 'Can not get invoice list',
  });

export const getSinglePayrun = ({payRunId}) =>
  useGetData(payRunId !== undefined ? getPayRunUrl(payRunId) : null);


export const useLatestPayRunToDate = ({ payRunTypeId }) =>
  useGetData(
    !payRunTypeId ? null : `${PAY_RUNS_URL}/${payRunTypeId}/previous-pay-run-end-date`,
    'Can not get latest pay run to date',
    null
  );

export const useReleasedInvoiceNumber = () =>
  useGetData(`${PAY_RUNS_URL}/released-invoice-count`, 'Can not get latest pay run to date', null);