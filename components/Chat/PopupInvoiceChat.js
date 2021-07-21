import React, { useState } from 'react';
import Popup from '../Popup';
import Dropdown from '../Dropdown';
import TextArea from '../TextArea';
import { ChatSettingsIcon } from '../Icons';
import { formatDateWithSign } from '../../service/helpers';

const PopupInvoiceChat = ({
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

  const createInvoiceChat = (
    <div className="popup-invoice-chat__container">
      <div className="popup-invoice-chat__header">
        <p>Package ID: {currentUserInfo.invoiceId}</p>
        <p>
          {formatDateWithSign(new Date())} - {formatDateWithSign(new Date(currentUserInfo.dateInvoiced))}
        </p>
        <p className="font-weight-bold">Currently waiting on: Finance</p>
      </div>
      <div className="popup-invoice-chat__messages">
        {messages.map((item) => {
          const { messageFromId } = item;
          const isMessageFromCurrentUser = String(messageFromId) === String(currentUserId);
          const messageFromClasses = isMessageFromCurrentUser
            ? 'popup-invoice-chat__message-from-current-user'
            : 'popup-invoice-chat__message-from-someone';
          const hoveredMessageClass = String(messageFromId) === String(hoveredMessage) ? ' hovered' : '';
          return (
            <div
              key={item.disputedInvoiceChatId}
              onMouseLeave={() => onMouseLeave(!isMessageFromCurrentUser)}
              onMouseEnter={() => !isMessageFromCurrentUser && setHoveredMessage(messageFromId)}
              className={`popup-invoice-chat__message ${messageFromClasses}${hoveredMessageClass}`}
            >
              <p className="popup-invoice-chat__message-from">
                {item.userFullName || 'userFullName'}
              </p>
              <div className="popup-invoice-chat__message-text-container">
                <p className="popup-invoice-chat__message-text">{item.message}</p>
                <div className="popup-invoice-chat__message-settings">
                  <ChatSettingsIcon onClick={() => setMessageSettingsId(messageFromId)} />
                  {String(messageSettingsId) === String(messageFromId) && (
                    <div onClick={() => setMessageSettingsId('')} className="popup-invoice-chat__message-settings-actions">
                      <p>Mark Unread</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="popup-invoice-chat__inputs">
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
          classes="popup-invoice-chat__textarea"
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
      classes="held-payments__popup-invoice-chat"
      closePopup={closePopup}
      mainContent={createInvoiceChat}
      title={`Help Payment - INV ${currentUserInfo.payRunId}`}
      secondButton={{
        text: 'Submit',
        onClick: () => console.log('send message id: ', currentUserInfo.creatorId),
      }}
    />
  );
};

export default PopupInvoiceChat;
