import React from "react";
import {ChatIcon} from "../Icons";

const ChatButton = ({onClick = () => {}}) => {
  return (
    <div onClick={onClick} className='chat-button'>
      <ChatIcon />
    </div>
  );
};

export default ChatButton;
