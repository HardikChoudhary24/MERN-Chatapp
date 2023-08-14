import React, { useRef, useState } from "react";
import imgdp from "../assets/profile.jpg";
import DeleteChat from "./DeleteChat";

const ChatHead = ({chatPerson}) => {
  const deleteModalRef = useRef(null);  
  const [modalState,setModalState ] = useState(false)
  const openModal =()=>{
    setModalState(!modalState);
  }
  return (
    <div className="mainbar-header">
      <img src={imgdp} alt="" />
      <div className="chat-info">
        <p className="chat-person-name">{chatPerson.name}</p>
        <p className="chat-person-email">{chatPerson.email}</p>
      </div>
      <button className="more-info" onClick={openModal}>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </button>
      <DeleteChat deleteModalRef={deleteModalRef} modalState={modalState} />
    </div>
  );
};

export default ChatHead;
