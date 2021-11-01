import useGetData from './useGetData';

const usePrimarySupportReason = () => useGetData('/primary-support-reasons', 'Can not get support reasons' , []);

export default usePrimarySupportReason;
