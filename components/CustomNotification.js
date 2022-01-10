import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeNotification,
  selectNotifications,
  showNotification,
  activateTimers,
} from '../reducers/notificationsReducer';

const CustomNotification = ({ className = '' }) => {
  const { notifications, visibleNotifications, notificationsLimit } = useSelector(selectNotifications);
  const [timers, setTimers] = useState([]);
  const dispatch = useDispatch();

  const closeNotification = (notification, index) => {
    if (timers[index]) {
      clearTimeout(timers[index]);
    }
    dispatch(removeNotification(notification));
  };

  useEffect(() => {
    if (!visibleNotifications.length) return;

    const newTimers = visibleNotifications
      .filter((item) => !item.activeTimer)
      .map((visibleNotification) =>
        setTimeout(() => {
          dispatch(removeNotification(visibleNotification));
        }, visibleNotification.time)
      );

    setTimers((prevState) => ({ ...prevState, ...newTimers }));
  }, [visibleNotifications]);

  useEffect(() => {
    if (timers.length) {
      dispatch(activateTimers());
    }
  }, [timers]);

  useEffect(() => {
    if (notifications.length && !visibleNotifications.length) {
      dispatch(showNotification(notifications[0]));
    }

    if (notifications.length && visibleNotifications.length < notificationsLimit) {
      dispatch(showNotification(notifications[0]));
    }
  }, [notifications, visibleNotifications, dispatch]);

  if (!visibleNotifications?.length) return <></>;

  return (
    <div className="notifications">
      {visibleNotifications.map((item) => {
        const allClasses = `notification ${item ? item.className || '' : ''} ${className}`;

        return (
          <div key={item?.id} className={allClasses}>
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
};

export default CustomNotification;
