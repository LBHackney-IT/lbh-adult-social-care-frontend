import useGetData from './useGetData';

export const useBrokers = () => {
  const { data } = useGetData('/users/broker', '', []);

  const options = data.map((el) => ({ value: el.id, text: el.userName }));

  return { options };
};

export const useApprovers = () => {
  const { data } = useGetData('/users/approver', '', []);

  const options = data.map((el) => ({ value: el.id, text: el.userName }));

  return { options };
};
