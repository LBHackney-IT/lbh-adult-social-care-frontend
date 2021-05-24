import React from "react";
import {ChatIcon} from "../../components/Icons";

const ChatButton = ({onClick = () => {}, classes = ''}) => {
  return (
    <div onClick={onClick} className={`chat-button ${classes}`}>
      <ChatIcon />
    </div>
  );
};

export default ChatButton;
