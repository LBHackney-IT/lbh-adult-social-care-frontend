import { useMemo } from 'react';
import useGetData from '../useGetData';

const usePackageGetAll = () => {
  const { data, isValidating } = useGetData('/lookups?name=packageType');

  const options = useMemo(() => data.map((type) => ({ value: type.id, text: type.name })), [data]);

  return { data, options, isValidating };
};

export default usePackageGetAll;
