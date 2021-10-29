import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSingleCorePackageInfo } from '../api';
import { NOT_FOUND_ROUTE } from '../routes/RouteConstants';

export const useRedirectIfPackageNotExist = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { error } = useSingleCorePackageInfo(packageId);

  useEffect(() => {
    if (error) router.replace(NOT_FOUND_ROUTE);
  }, [error]);
};
