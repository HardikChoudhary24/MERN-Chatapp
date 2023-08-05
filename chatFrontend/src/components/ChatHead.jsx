import React, { useRef, useState } from "react";
import imgdp from "../assets/profile.jpg";
import DeleteChat from "./DeleteChat";

const ChatHead = () => {
  const deleteModalRef = useRef(null);  
  const [modalState,setModalState ] = useState(false)
  const openModal =()=>{
    setModalState(!modalState);
  }
  return (
    <div className="mainbar-header">
      <img src={imgdp} alt="" />
      <div className="chat-info">
        <p className="chat-person-name">Hardik choudhary</p>
        <p className="chat-person-email">hardik102@gmail.com</p>
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
