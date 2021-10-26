import { useFetchWithParams } from './useFetchWithParams';
import useGetData from './useGetData';

export const useApprovals = ({ params, approverId, shouldFetch }) => {
  const approverIdUrl = approverId ? `/${approverId}` : '';

  return useFetchWithParams({
    params,
    shouldFetch,
    url: `care-packages/approvals${approverIdUrl}`
  });
};

export const useApproversOptions = () => {
  const { data, isLoading } = useGetData('/users/approver', '', []);

  const options = data.map((el) => ({ value: el.id, text: el.userName }));

  return { options, isLoading };
};