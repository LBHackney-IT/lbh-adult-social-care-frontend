import { useMemo } from 'react';
import useGetData from '../useGetData';
import { useFetchWithParams } from '../useFetchWithParams';

const usePackageGetAll = () => {
  const { data, isLoading } = useGetData('/lookups?name=packageType', 'Can not get packages', []);

  const options = useMemo(() => data.map((type) => ({ value: type.id, text: type.name })), [data]);

  return { data, options, isLoading };
};

export const useGetPackage = ({ params, url = '', shouldFetch }) => (
  useFetchWithParams({
    shouldFetch,
    params,
    url: `/lookups${url ? ` ${url}` : ''}`,
    errorText: 'Can not get package'
  })
);

export default usePackageGetAll;
