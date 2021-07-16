import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { removeNotification, selectNotifications, showNotification } from '../reducers/notificationsReducer'

const CustomNotification = ({ className = '' }) => {
  const { notifications, showedNotifications } = useSelector(selectNotifications);
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();
  console.log(notifications);

  const closeNotification = () => {
    if(timer) {
      clearTimeout(timer);
    }
    dispatch(removeNotification(notifications[0]));
  };

  useEffect(() => {
    if(!showedNotifications.length && notifications[0]) {
      dispatch(showNotification(notifications[0]));

      if(notifications[0].time === 'debugger') return;

      if(timer) {
        clearTimeout(timer);
      }

      setTimer(setTimeout(() => {
        dispatch(removeNotification(notifications[0]))
      }, notifications[0].time));
    }
  }, [notifications, showedNotifications, dispatch]);

  const allClasses = `notification ${notifications[0] ? notifications[0].className || '' : ''} ${className}`;

  if(notifications[0]?.text) {
    return (
      <div className={allClasses}>
        <div>
          <p>{notifications[0].text}</p>
          <span className='notification-close' onClick={closeNotification}>+</span>
        </div>
      </div>
    )
  }
  return <></>;
}

export default CustomNotification;
