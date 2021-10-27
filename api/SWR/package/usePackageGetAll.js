import { useMemo } from 'react';
import useGetData from '../useGetData';
import { useFetchWithParams } from '../useFetchWithParams';

export const useLookups = ({ params, url = '', shouldFetch }) => {
  if(!params) {
    const { data, isLoading } = useGetData('/lookups?name=packageType', 'Can not get packages', []);

    const options = useMemo(() => data.map((type) => ({ value: type.id, text: type.name })), [data]);

    return { data, options, isLoading };
  }
  return (
  useFetchWithParams({
    shouldFetch,
    params,
    url: `/lookups${url ? ` ${url}` : ''}`,
    errorText: 'Can not get package'
  })
)};

export default useLookups;
