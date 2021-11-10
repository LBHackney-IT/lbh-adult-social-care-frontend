import { useGetData } from 'api';
import { useFetchWithParams } from './useFetchWithParams';

const PAY_RUNS_URL = '/payruns';

export const usePayrunView = ({ params }) =>
  useFetchWithParams({
    params,
    url: `${PAY_RUNS_URL}`,
    errorText: 'Can not get payrun list',
  });

export const useSinglePayrunView = ({ payRunId }) =>
  useFetchWithParams({
    url: `${PAY_RUNS_URL}/${payRunId}`,
    errorText: 'Can not get payrun information',
  });

export const getSinglePayrun = ({payRunId}) =>
  useGetData(payRunId !== undefined ? `${PAY_RUNS_URL}/${payRunId}` : null);
