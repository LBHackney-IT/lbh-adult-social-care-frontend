import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Popup from '../Popup';
import Dropdown from '../Dropdown';
import TextArea from '../TextArea';
import { ChatSettingsIcon } from '../Icons';
import { formatDateWithSign, scrollToElement } from '../../service/helpers'
import { sendMessage } from '../../api/Payments/PayRunApi';
import { addNotification } from '../../reducers/notificationsReducer';

const PopupInvoiceChat = ({
  closePopup,
  newMessageText,
  setNewMessageText,
  changeWaitingOn,
  waitingOnOptions = [],
  currentUserInfo,
  waitingOn,
  updateChat = () => {
    console.log('update chat');
  },
  messages = [],
}) => {
  const dispatch = useDispatch();
  const chatRef = useRef(null);
  const [messageSettingsId, setMessageSettingsId] = useState('');

  const openSettings = (disputedInvoiceChatId) => {
    if(messageSettingsId && disputedInvoiceChatId === messageSettingsId) {
      setMessageSettingsId('');
    } else {
      setMessageSettingsId(disputedInvoiceChatId)
    }
  }

  useEffect(() => {
    if(waitingOnOptions?.length) {
      changeWaitingOn(waitingOnOptions[0].value);
    }
  }, [waitingOnOptions]);

  useEffect(() => {
    const chatEl = chatRef.current;
    if(chatEl) {
      scrollToElement({ element: chatEl });
    }
  }, [messages]);

  const createInvoiceChat = (
    <div className="popup-invoice-chat__container">
      <div className="popup-invoice-chat__header">
        <p>Package ID: {currentUserInfo.invoiceId}</p>
        <p>
          {formatDateWithSign(new Date())} - {formatDateWithSign(new Date(currentUserInfo.dateInvoiced))}
        </p>
        <p className="font-weight-bold">Currently waiting on: {messages[0]?.actionRequiredFromName || ''}</p>
      </div>
      <div className="popup-invoice-chat__messages">
        {messages.map((item, index) => {
          const { messageFromId, disputedInvoiceChatId } = item;
          const isLast = index === messages.length-1;
          const settingsOpenedClassItem = messageSettingsId === disputedInvoiceChatId ? ' settings-opened' : '';
          const settingsLastItemClass = isLast ? ' last-item' : '';
          const isMessageFromCurrentUser = !messageFromId;
          const messageFromClasses = isMessageFromCurrentUser
            ? 'popup-invoice-chat__message-from-current-user'
            : 'popup-invoice-chat__message-from-someone';
          const propsObject = isLast ? { ref: chatRef } : {};
          return (
            <div
              key={item.disputedInvoiceChatId}
              {...propsObject}
              className={`popup-invoice-chat__message ${messageFromClasses}`}
            >
              <p className="popup-invoice-chat__message-from">{isMessageFromCurrentUser ? currentUserInfo.loggedInUserName : item.actionRequiredFromName}</p>
              <div className="popup-invoice-chat__message-text-container">
                <p className="popup-invoice-chat__message-text">{item.message}</p>
                <div className={`popup-invoice-chat__message-settings${settingsOpenedClassItem}`}>
                  <ChatSettingsIcon onClick={() => openSettings(disputedInvoiceChatId)} />
                  {String(messageSettingsId) === String(disputedInvoiceChatId) && (
                    <div
                      onClick={() => setMessageSettingsId('')}
                      className={`popup-invoice-chat__message-settings-actions${settingsLastItemClass}`}
                    >
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
          <>
            <p>Assigned to:</p>
            <Dropdown
              classes="hold-payment__dropdown"
              initialText="Change waiting on"
              onOptionSelect={(value) => changeWaitingOn(value)}
              options={waitingOnOptions}
              selectedValue={waitingOn}
            />
          </>
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
      className="held-payments__popup-invoice-chat"
      closePopup={closePopup}
      mainContent={createInvoiceChat}
      title={`Help Payment - INV ${currentUserInfo.payRunId}`}
      secondButton={{
        text: 'Submit',
        onClick: () => {
          sendMessage({
            payRunId: currentUserInfo.payRunId,
            message: newMessageText,
            actionRequiredFromId: waitingOn,
            invoiceId: currentUserInfo.invoiceId,
          })
            .then(async () => {
              setNewMessageText('');
              await updateChat();
            })
            .catch((e) => dispatch(addNotification({ text: e })));
        },
      }}
    />
  );
};

export default PopupInvoiceChat;
