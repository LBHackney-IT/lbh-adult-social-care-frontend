import React from 'react';
import { ChatIcon } from '../Icons';

const ChatButton = ({ onClick = () => {}, classes = '' }) => (
  <div onClick={onClick} className={`chat-button ${classes}`}>
    <ChatIcon />
  </div>
);

export default ChatButton;
