import { useMemo } from 'react';
import useGetData from '../useGetData';

const usePackageGetAll = () => {
  const { data } = useGetData('/package/getAll');

  const options = useMemo(() => data.map((type) => ({ value: type.id, text: type.packageType })), [data]);

  return { data, options };
};

export default usePackageGetAll;
