import useGetData from '../useGetData';

const usePrimarySupportReason = () => {
  const response = useGetData('/primary-support-reasons');

  return { ...response, primarySupportReasonLoading: !!response.data };
};

export default usePrimarySupportReason;
