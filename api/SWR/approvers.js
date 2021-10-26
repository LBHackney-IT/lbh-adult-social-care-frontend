import { useFetchWithParams } from './useFetchWithParams';
import useGetData from './useGetData';

export const useApprovers = ({ params, approverId, shouldFetch }) => {
  const approverIdUrl = approverId ? `/${approverId}` : '';

  return useFetchWithParams({
    params,
    shouldFetch,
    url: `/approvers${approverIdUrl}`
  });
};

export const useApproversOptions = () => {
  const { data, isLoading } = useGetData('/users/approver', '', []);

  const options = data.map((el) => ({ value: el.id, text: el.userName }));

  return { options, isLoading };
};