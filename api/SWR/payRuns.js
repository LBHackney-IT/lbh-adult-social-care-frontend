import { useFetchWithParams } from './useFetchWithParams';

const PAY_RUNS_URL = '/payruns';

export const usePayrunView = ({ params }) =>
  useFetchWithParams({
    params,
    url: `${PAY_RUNS_URL}`,
    errorText: 'Can not get payrun list',
  });