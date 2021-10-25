import useGetData from './useGetData';

export const useBrokers = () => {
  const { data, isLoading } = useGetData('/users/broker', '', []);

  const options = data.map((el) => ({ value: el.id, text: el.userName }));

  return { options, isLoading };
};

export const useUsers = () => {
  const { data, isLoading } = useGetData('/users', '', []);

  const options = data.map((el) => ({ value: el.id, text: el.userName }));

  return { options, isLoading };
};

export const useApprovers = () => {
  const { data, isLoading } = useGetData('/users/approver', '', []);

  const options = data.map((el) => ({ value: el.id, text: el.userName }));

  return { options, isLoading };
};
