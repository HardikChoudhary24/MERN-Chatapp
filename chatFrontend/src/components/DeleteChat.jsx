import React from 'react'

const DeleteChat = ({ deleteModalRef ,modalState}) => {
  return (
    <div className="deletechat-modal" ref={deleteModalRef} style={{display:!modalState&&"none"}}>
      <button className="clear-chat">Clear Chat</button>
    </div>
  );
};

export default DeleteChat
