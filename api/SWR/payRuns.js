import { useFetchWithParams } from './useFetchWithParams';

const PAY_RUNS_URL = '/payruns';

export const usePayrunView = ({ params }) =>
  useFetchWithParams({
    params,
    url: `${PAY_RUNS_URL}`,
    errorText: 'Can not get payrun list',
  });

export const useInvoiceListView = ({ payRunId, params }) =>
  useFetchWithParams({
    params,
    url: `${PAY_RUNS_URL}/${payRunId}`,
    errorText: 'Can not get invoice list',
  });