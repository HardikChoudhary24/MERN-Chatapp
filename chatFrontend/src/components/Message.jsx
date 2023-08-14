import React from "react";

const Message = ({msg}) => {
  const authorId = sessionStorage.getItem("id");
  const owner = msg?.sender === authorId? true:false;
  return (
    <div
      className="message-row"
      style={{ justifyContent: owner ? "flex-end" : "flex-start" }}
    >
      <div
        className={owner ? "message-container owner" : "message-container"}
        style={{
          borderRadius: owner ? "10px 0 10px 10px" : "0 10px 10px 10px",
        }}
      >
        <p>{msg.content}</p>
        <span>{msg.time}</span>
      </div>
    </div>
  );
};

export default Message;
