import React, { memo } from 'react';

const Notifications = ({ className = '', notifications = [], closeNotification }) => (
  <div className="notifications">
    {notifications.map((item) => {
      const allClasses = `notification ${item ? item.className || '' : ''} ${className}`;

      return (
        <div key={item?.text?.toString() || 'error'} className={allClasses}>
          <div>
            <p>{item?.text?.toString() || 'Something went wrong'}</p>
            {closeNotification && (
              <span className="notification-close" onClick={() => closeNotification(item)}>
                +
              </span>
            )}
          </div>
        </div>
      );
    })}
  </div>
);

export default memo(Notifications);
