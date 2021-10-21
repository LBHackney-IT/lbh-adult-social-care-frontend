import { useMemo } from 'react';
import useGetData from '../useGetData';

const usePackageGetAll = () => {
  const { data, isLoading } = useGetData('/lookups?name=packageType', 'Can not get packages', []);

  const options = useMemo(() => data.map((type) => ({ value: type.id, text: type.name })), [data]);

  return { data, options, isLoading };
};

export default usePackageGetAll;
