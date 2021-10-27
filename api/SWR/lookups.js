import { useMemo } from 'react';
import { useFetchWithParams } from './useFetchWithParams';

export const useLookups = (name) => {
  const params = useMemo(() => ({ name }), [name]);

  const { data, isLoading } = useFetchWithParams({
    url: '/lookups',
    params,
    initialData: [],
  });

  const options = useMemo(() => data.map((type) => ({ value: type.id, text: type.name })), [data]);

  return { data, options, isLoading };
};
