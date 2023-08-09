import React from "react";

const Message = ({msg}) => {
  const owner = true;
  return (
    <div
      className="message-row"
      style={{ justifyContent: owner ? "flex-end" : "flex-start" }}
    >
      <div
        className="message-container"
        style={{
          borderRadius: owner ? "10px 0 10px 10px" : "0 10px 10px 10px",
        }}
      >
        <p>{msg}</p>
        <span>7:59 am</span>
      </div>
    </div>
  );
};

export default Message;
