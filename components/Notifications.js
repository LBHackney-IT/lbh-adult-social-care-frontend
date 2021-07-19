import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification, selectNotifications, showNotification } from '../reducers/notificationsReducer'

const CustomNotification = ({ className = '' }) => {
  const { notifications, showedNotifications } = useSelector(selectNotifications);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!showedNotifications.length && notifications[0]) {
      dispatch(showNotification(notifications[0]));

      if(notifications[0].time === 'debugger') return;

      setTimeout(() => {
        dispatch(removeNotification(notifications[0]))
      }, notifications[0].time);
    }
  }, [notifications, showedNotifications, dispatch]);

  const allClasses = `notification ${notifications[0] ? notifications[0].className || '' : ''} ${className}`;

  if(notifications[0]?.text) {
    return (
      <div className={allClasses}>
        <div>
          <p>{notifications[0].text}</p>
        </div>
      </div>
    )
  }
  return <></>;
}

export default CustomNotification;
