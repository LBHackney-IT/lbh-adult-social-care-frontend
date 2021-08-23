import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification, selectNotifications, showNotification } from '../reducers/notificationsReducer';

const CustomNotification = ({ className = '' }) => {
  const { notifications, showedNotifications } = useSelector(selectNotifications);
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();

  const closeNotification = (notification) => {
    if (timer) {
      clearTimeout(timer);
    }
    dispatch(removeNotification(notification));
  };

  useEffect(() => {
    if(!showedNotifications.length) return;
    if (showedNotifications[0].time === 'debugger') return;

    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        dispatch(removeNotification(showedNotifications[0]));
      }, showedNotifications[0].time)
    );
  }, [showedNotifications]);

  useEffect(() => {
    if (notifications[0] && !showedNotifications.length) {
      dispatch(showNotification(notifications[0]));
    }
  }, [notifications, showedNotifications, dispatch]);

  const allClasses = `notification ${showedNotifications[0] ? showedNotifications[0].className || '' : ''} ${className}`;

  if (showedNotifications?.length) {
    return (
      <div className='notifications'>
        {showedNotifications.map(item => (
            <div key={item.text.toString()} className={allClasses}>
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
