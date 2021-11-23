import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NOT_FOUND_ROUTE } from '../routes/RouteConstants';
import { useSingleCorePackageInfo } from '../api';

export const useRedirectIfPackageNotExist = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { error, isLoading, data } = useSingleCorePackageInfo(packageId);

  useEffect(() => {
    if (error) router.replace(NOT_FOUND_ROUTE);
  }, [error]);

  return { isLoading, data };
};

export function useScrollLock(isLocked) {
  useEffect(() => {
    document.querySelector('html').style.overflow = isLocked ? 'hidden' : 'visible';
    return () => {
      document.querySelector('html').style.overflow = 'visible';
    };
  }, [isLocked]);
}
