import React from 'react';
import { ChatIcon } from '../Icons';

const ChatButton = ({ onClick = () => {} }) => (
  <div onClick={onClick} className="chat-button">
    <ChatIcon />
  </div>
);

export default ChatButton;
