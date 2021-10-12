import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';

const useErrorNotification = (error, text) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error && text) dispatch(addNotification({ text }));
  }, [error, text]);
};

export default useErrorNotification;
