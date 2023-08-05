import React from "react";
import { BiImageAdd } from "react-icons/bi";

const Input = () => {
  return (
    <div className="mssg-input">
      <button className="image-btn">
        <BiImageAdd className="add-image"/>
      </button>
      <input type="text" placeholder="Type a message" />
      <button className="send-btn">Send</button>
    </div>
  );
};

export default Input;
