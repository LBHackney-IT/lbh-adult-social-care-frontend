import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, RadioGroup, Button, HorizontalSeparator, Input } from 'components';
import { addNotification, selectNotifications, changeNotificationsLimit } from '../reducers/notificationsReducer';

const initialNotification = {
  time: 3000,
  className: 'error',
  text: 'Notification text',
};

const TestNotification = () => {
  const dispatch = useDispatch();
  const { notifications, notificationsLimit, visibleNotifications } = useSelector(selectNotifications);
  const [newNotification, setNewNotification] = useState(initialNotification);

  const onChangeNewNotification = (field, value) => {
    setNewNotification(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const onChangeNotificationsLimit = (limit) => {
    dispatch(changeNotificationsLimit(limit));
  }

  const onAddNotification = () => {
    dispatch(addNotification({
      ...newNotification,
      text: `${newNotification.text} ${Math.random().toString().slice(2, 4)}`
    }));
  };

  return (
    <Container padding={30}>
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
      <Input
        type='number'
        label='Notifications limit'
        value={notificationsLimit}
        onChangeValue={onChangeNotificationsLimit}
      />
      {['text', 'time'].map((field) => (
        <Input
          key={field}
          hint={field === 'text' ? 'Should be unique' : '1000 = 1 second'}
          value={newNotification[field]}
          type={field === 'time' ? 'number' : ''}
          onChangeValue={(value) => onChangeNewNotification(field, value)}
          label={field}
        />
      ))}
      <HorizontalSeparator height={10} />
      <Button onClick={onAddNotification}>Push notification</Button>
    </Container>
  );
};

export default TestNotification;