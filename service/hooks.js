import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NOT_FOUND_ROUTE } from '../routes/RouteConstants';

export const useRedirectIfGUIDNotFound = (request) => {
  const router = useRouter();
  const { guid } = router.query;

  const response = request(guid);

  useEffect(() => {
    if (response.error) router.replace(NOT_FOUND_ROUTE);
  }, [response.error]);

  return response;
}