import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../reducers/notificationsReducer';

const useErrorNotification = (error, text) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) dispatch(addNotification({ text }));
  }, [error]);
};

export default useErrorNotification;
