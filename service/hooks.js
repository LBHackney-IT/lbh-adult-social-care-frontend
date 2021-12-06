import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { NOT_FOUND_ROUTE } from '../routes/RouteConstants';
import { useDocument, useSingleCorePackageInfo } from '../api';
import { formatDocumentInfo } from './helpers';
import { addNotification } from '../reducers/notificationsReducer';

export const useRedirectIfPackageNotExist = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { error, isLoading, data } = useSingleCorePackageInfo(packageId);

  useEffect(() => {
    if (error) router.replace(NOT_FOUND_ROUTE);
  }, [error]);

  return { isLoading, data };
};

export const useNotifications = () => {
  const dispatch = useDispatch();

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  return pushNotification;
};

export function useScrollLock (isLocked) {
  useEffect(() => {
    document.querySelector('html').style.overflow = isLocked ? 'hidden' : 'visible';
    return () => {
      document.querySelector('html').style.overflow = 'visible';
    };
  }, [isLocked]);
}

export const useGetFile = ({ fileId, fileName, setter }) => {
  const { data: href, isLoading } = useDocument(fileName && fileId);

  useEffect(() => {
    if (!href) return;

    (async () => {
      const file = await formatDocumentInfo({ fileName, href });

      setter(file);
    })();
  }, [href]);

  return { isLoading };
};

export const useGetFileWithRequest = ({ request, setLoading, dependence, setter }) => {
  useEffect(() => {
    if (!dependence) return;

    (async () => {
      if (setLoading) setLoading(true);

      try {
        const blob = await request();
        setter(blob);
      } catch (e) {
        console.log(e, e?.message);
      }

      setLoading(false);
    })();
  }, [dependence]);
};