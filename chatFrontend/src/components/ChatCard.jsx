import React from 'react'
import imgdp from "../assets/profile.jpg"

const ChatCard = () => {
  return (
    <div className="chat-card">
      <div className="profile-img">
        <img src={imgdp} alt=""/>
      </div>
      <div className='chat-info'>
        <div className='chat-name'>
            Hardik choudhary
        </div>
        <div className='last-chat'>
            hardik is good...
        </div>
      </div>
      <div className="msg-count">3</div>
    </div>
  );
}

export default ChatCard
