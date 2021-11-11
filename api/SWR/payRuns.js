import { useGetData } from 'api';
import { useFetchWithParams } from './useFetchWithParams';

const PAY_RUNS_URL = '/payruns';
const getPayRunUrl = (payRunId) => `${PAY_RUNS_URL}/${payRunId}`;

export const usePayrunView = ({ params }) =>
  useFetchWithParams({
    params,
    url: `${PAY_RUNS_URL}`,
    errorText: 'Can not get payrun list',
  });

export const useSinglePayrunView = ({ payRunId }) =>
  useFetchWithParams({
    url: getPayRunUrl(payRunId),
    errorText: 'Can not get payrun information',
  });

export const getSinglePayrun = ({payRunId}) =>
  useGetData(payRunId !== undefined ? getPayRunUrl(payRunId) : null);


export const useLatestPayRunToDate = () =>
  useGetData(`${PAY_RUNS_URL}/latestPayRunToDate`, 'Can not get latest pay run to date', null);

export const useReleasedInvoiceNumber = () =>
  useGetData(`${PAY_RUNS_URL}/releasedInvoiceNumber`, 'Can not get latest pay run to date', null);