import React, { useState } from 'react';
import Popup from '../Popup';
import Dropdown from '../Dropdown';
import TextArea from '../TextArea';
import { ChatSettingsIcon } from '../Icons';
import { formatDateWithSign } from '../../service/helpers';

const PopupHelpChat = ({
  closePopup,
  newMessageText,
  setNewMessageText,
  changeWaitingOn,
  waitingOnOptions = [],
  currentUserInfo,
  waitingOn,
  messages = [],
  currentUserId,
}) => {
  const [messageSettingsId, setMessageSettingsId] = useState('');
  const [hoveredMessage, setHoveredMessage] = useState('');

  const onMouseLeave = (isActive) => {
    if (isActive) {
      setHoveredMessage('');
      setMessageSettingsId('');
    }
  };

  const createHelpChat = (
    <div className="popup-help-chat__container">
      <div className="popup-help-chat__header">
        <p>Package ID: XXXXXXX</p>
        <p>
          {formatDateWithSign(new Date())} - {formatDateWithSign(new Date(new Date().getTime() + 2000000000))}
        </p>
        <p className="font-weight-bold">Currently waiting on: Finance</p>
      </div>
      <div className="popup-help-chat__messages">
        {messages.map((item) => {
          const isMessageFromCurrentUser = String(item.userId) === String(currentUserId);
          const messageFromClasses = isMessageFromCurrentUser
            ? 'popup-help-chat__message-from-current-user'
            : 'popup-help-chat__message-from-someone';
          const hoveredMessageClass = String(item.id) === String(hoveredMessage) ? ' hovered' : '';
          return (
            <div
              onMouseLeave={() => onMouseLeave(!isMessageFromCurrentUser)}
              onMouseEnter={() => !isMessageFromCurrentUser && setHoveredMessage(item.id)}
              className={`popup-help-chat__message ${messageFromClasses}${hoveredMessageClass}`}
            >
              <p className="popup-help-chat__message-from">
                {isMessageFromCurrentUser ? currentUserInfo.waitingFor : item.fullName}
              </p>
              <div className="popup-help-chat__message-text-container">
                <p className="popup-help-chat__message-text">{item.text}</p>
                <div className="popup-help-chat__message-settings">
                  <ChatSettingsIcon onClick={() => setMessageSettingsId(item.id)} />
                  {String(messageSettingsId) === String(item.id) && (
                    <div onClick={() => setMessageSettingsId('')} className="popup-help-chat__message-settings-actions">
                      <p>Mark Unread</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="popup-help-chat__inputs">
        {changeWaitingOn && (
          <Dropdown
            classes="hold-payment__dropdown"
            initialText="Change waiting on"
            onOptionSelect={(value) => changeWaitingOn(value)}
            options={waitingOnOptions}
            selectedValue={waitingOn}
          />
        )}
        <TextArea
          classes="popup-help-chat__textarea"
          rows={8}
          value={newMessageText}
          placeholder="New Message"
          onChange={(value) => setNewMessageText(value)}
        />
      </div>
    </div>
  );

  return (
    <Popup
      classes="held-payments__popup-help-chat"
      closePopup={closePopup}
      mainContent={createHelpChat}
      title={`Help Payment - INV ${currentUserInfo.payRunId}`}
      secondButton={{
        text: 'Submit',
        onClick: () => console.log('send message id: ', currentUserInfo.id),
      }}
    />
  );
};

export default PopupHelpChat;
