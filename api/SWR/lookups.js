import { useMemo } from 'react';
import useSWR from 'swr';
import fetcher from './fetcher';

export const useLookups = (name) => {
  const response = useSWR(['/lookups', name], (url, nameParam) => fetcher(url, { params: { name: nameParam } }));
  const { error, data } = response;

  const options = useMemo(() => data?.map((type) => ({ value: type.id, text: type.name })), [data]);

  return {
    ...response,
    data: data ?? [],
    isLoading: !error && !data,
    options,
  };
};
