import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification, selectNotifications, showNotification } from '../reducers/notificationsReducer';

const CustomNotification = ({ className = '' }) => {
  const { notifications, showedNotifications, notificationsLimit } = useSelector(selectNotifications);
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();

  const closeNotification = (notification) => {
    if (timer) {
      clearTimeout(timer);
    }
    dispatch(removeNotification(notification));
  };

  useEffect(() => {
    if (notifications[0] && showedNotifications.length < notificationsLimit) {
      const currentNotification = {...notifications[0]};
      dispatch(showNotification(notifications[0]));

      if (currentNotification.time === 'debugger') return;

      if (timer) {
        clearTimeout(timer);
      }

      setTimer(
        setTimeout(() => {
          dispatch(removeNotification(currentNotification));
        }, currentNotification.time)
      );
    }
  }, [notifications, showedNotifications, dispatch]);

  const allClasses = `notification ${showedNotifications[0] ? showedNotifications[0].className || '' : ''} ${className}`;

  if (showedNotifications?.length) {
    return (
      <div className='notifications'>
        {showedNotifications.map(item => (
            <div key={item.text} className={allClasses}>
              <div>
                <p>{item.text.toString()}</p>
                <span className="notification-close" onClick={() => closeNotification(item)}>
                  +
                </span>
              </div>
            </div>
          ))}
      </div>
    );
  }
  return <></>;
};

export default CustomNotification;
