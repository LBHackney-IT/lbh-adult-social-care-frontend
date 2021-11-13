import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NOT_FOUND_ROUTE } from '../routes/RouteConstants';
import { useSingleCorePackageInfo } from '../api';

export const useRedirectIfPackageNotExist = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { error, isLoading } = useSingleCorePackageInfo(packageId);

  useEffect(() => {
    if (error) router.replace(NOT_FOUND_ROUTE);
  }, [error]);

  return isLoading;
};

export const useRedirectIfGUIDNotFound = (request) => {
  const router = useRouter();
  const { guid } = router.query;

  const response = request(guid);

  useEffect(() => {
    if (response.error) router.replace(NOT_FOUND_ROUTE);
  }, [response.error]);

  return response;
}