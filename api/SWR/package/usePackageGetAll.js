import { useMemo } from 'react';
import useGetData from '../useGetData';

const usePackageGetAll = () => {
  const { data } = useGetData('/lookups?name=packageType');

  const options = useMemo(() => data.map((type) => ({ value: type.id, text: type.name })), [data]);

  return { data, options, packageGetAllLoading: !!data };
};

export default usePackageGetAll;
