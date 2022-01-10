import React, { useEffect, useState } from 'react';
import Notifications from './index';
import { Container } from '../Layout/Container';
import Button from '../Button';
import { Input } from '../Input';
import { HorizontalSeparator } from '../Layout/HorizontalSeparator';
import RadioGroup from '../RadioGroup';

export default {
  title: 'Hackney Design System/Notifications',
  component: Notifications,
  argTypes: {
    control: null,
  },
};

const initialNotification = {
  time: 3000,
  className: 'error',
  text: 'Notification text',
};

const Template = (args) => {
  const [notifications, setNotifications] = useState([]);
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const [timers, setTimers] = useState([]);
  const [newNotification, setNewNotification] = useState(initialNotification);

  const closeNotification = (notification, index) => {
    if (timers[index]) {
      clearTimeout(timers[index]);
    }
    removeNotification(notification);
  };

  const addNotification = () => {
    setNotifications([
      ...notifications,
      { ...newNotification, text: `${newNotification.text} ${Math.random().toString().slice(2, 4)}` },
    ]);
  };

  const showNotification = (notification) => {
    const cloneShowed = visibleNotifications.filter((showed) => showed.text !== notification.text);
    setVisibleNotifications([...cloneShowed, notification]);
    setNotifications(notifications.slice(1, notifications.length));
  };

  const onChangeNewNotification = (field, value) => {
    setNewNotification((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const removeNotification = (notification) => {
    const cloneShowed = visibleNotifications.filter((showed) => showed.text !== notification.text);
    setVisibleNotifications(cloneShowed);
  };

  useEffect(() => {
    if (!visibleNotifications.length) return;

    const newTimers = visibleNotifications
      .filter((item) => !item.activeTimer)
      .map((visibleNotification) =>
        setTimeout(() => {
          removeNotification(visibleNotification);
        }, visibleNotification.time)
      );

    if (!newTimers.length) return;

    setTimers((prevState) => [...prevState, ...newTimers]);
  }, [visibleNotifications]);

  useEffect(() => {
    if (timers.length) {
      const activatedNotifications = visibleNotifications.map((item) => ({ ...item, activeTimer: true }));
      setVisibleNotifications(activatedNotifications);
    }
  }, [timers]);

  useEffect(() => {
    if (notifications.length && !visibleNotifications.length) {
      showNotification(notifications[0]);
    }

    if (notifications.length && visibleNotifications.length < args.notificationsLimit) {
      showNotification(notifications[0]);
    }
  }, [notifications, visibleNotifications]);

  return (
    <Container>
      <p>Notification counter: {notifications.length}</p>
      <p>Visible notification counter: {visibleNotifications.length}</p>
      <HorizontalSeparator height={10} />
      <RadioGroup
        inline
        handle={(value) => onChangeNewNotification('className', value)}
        value={newNotification.className}
        items={[
          { id: 'error', label: 'Error notification' },
          { id: 'success', label: 'Success notification' },
        ]}
      />
      {['text', 'time'].map((field) => (
        <>
          <Input
            key={field}
            hint={field === 'text' ? 'Should be unique' : ''}
            value={newNotification[field]}
            type={field === 'time' ? 'number' : ''}
            onChangeValue={(value) => onChangeNewNotification(field, value)}
            label={field}
          />
          <HorizontalSeparator height={10} />
        </>
      ))}
      <Button onClick={addNotification}>Push notification</Button>
      {!!visibleNotifications.length && (
        <Notifications {...args} closeNotification={closeNotification} notifications={visibleNotifications} />
      )}
    </Container>
  );
};

export const Default = Template.bind({});

Default.args = {
  notificationsLimit: 1,
};

export const MultipleNotifications = Template.bind({});

MultipleNotifications.args = {
  notificationsLimit: 2,
};
