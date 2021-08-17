import React from 'react';
import { ChatIcon } from '../Icons';

const ChatButton = ({ onClick = () => {} }) => (
  <div title='Held chat' onClick={onClick} className="chat-button">
    <ChatIcon />
  </div>
);

export default ChatButton;
