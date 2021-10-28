import { useMemo } from 'react';
import { useFetchWithParams } from './useFetchWithParams';

const useLookups = ({ params, url = '', shouldFetch }) => {
  const { data, isLoading } = useFetchWithParams({
    shouldFetch,
    params,
    url: `/lookups${url ? ` ${url}` : ''}`,
    errorText: 'Can not get package',
    initialData: [],
  });

  const options = useMemo(() => data.map((type) => ({ value: type.id, text: type.name })), [data]);

  return { data, options, isLoading };
};

export default useLookups;
