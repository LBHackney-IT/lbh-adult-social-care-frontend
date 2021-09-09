import React from 'react';
import { ChatIcon } from '../Icons';

const ChatButton = ({ onClick = () => {}, className = '' }) => (
  <div onClick={onClick} className={`chat-button ${className}`}>
    <ChatIcon />
  </div>
);

export default ChatButton;
