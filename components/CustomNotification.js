import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification, selectNotifications, showNotification } from '../reducers/notificationsReducer';

const CustomNotification = ({ className = '' }) => {
  const { notifications, showedNotifications, notificationsLimit } = useSelector(selectNotifications);
  const [timers, setTimers] = useState([]);
  const dispatch = useDispatch();

  const closeNotification = (notification, index) => {
    if (timers[index]) {
      clearTimeout(timers[index]);
    }
    dispatch(removeNotification(notification));
  };

  useEffect(() => {
    if (!showedNotifications.length) return;

    const newTimers = showedNotifications.map(showedNotification => (
      setTimeout(() => {
        dispatch(removeNotification(showedNotification));
      }, showedNotification.time)
    ));

    setTimers(newTimers);
  }, [showedNotifications]);

  useEffect(() => {
    if (notifications.length && !showedNotifications.length) {
      dispatch(showNotification(notifications[0]));
    }

    if (notifications.length && showedNotifications.length === notificationsLimit - 1) {
      dispatch(showNotification(notifications[0]));
    }
  }, [notifications, showedNotifications, dispatch]);

  if (showedNotifications?.length) {
    return (
      <div className="notifications">
        {showedNotifications.map(item => {
          const allClasses = `notification ${item ? item.className || '' : ''} ${className}`;

          return (
            <div key={item?.text?.toString() || 'error'} className={allClasses}>
              <div>
                <p>{item?.text?.toString() || 'Something went wrong'}</p>
                <span className="notification-close" onClick={() => closeNotification(item)}>
                  +
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return <></>;
};

export default CustomNotification;
