import React from 'react'
import imgdp from "../assets/profile.jpg"

const ChatCard = ({ chatName, chat ,openChats }) => {
  console.log(chat)
  return (
    <div className="chat-card" onClick={()=>openChats(chat)}>
      <div className="profile-img">
        <img src={imgdp} alt="" />
      </div>
      <div className="chat-info">
        <div className="chat-name">{chatName}</div>
        <div className="last-chat"></div>
      </div>
      <div className="msg-count">3</div>
    </div>
  );
};

export default ChatCard
