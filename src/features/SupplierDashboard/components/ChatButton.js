import React from "react";
import {ChatIcon} from "../../components/Icons";

const ChatButton = ({onClick = () => {}}) => {
  return (
    <div onClick={onClick} className='chat-button'>
      <ChatIcon />
    </div>
  );
};

export default ChatButton;
