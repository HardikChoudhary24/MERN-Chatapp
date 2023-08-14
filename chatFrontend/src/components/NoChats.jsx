import React from 'react'
import {
  FaPaperPlane,
  IconContext,
} from "../assets/icons";
const NoChats = () => {
  return (
    <div className="noChat">
        <IconContext.Provider
          value={{
            color: "#4d61d1",
            className: "global-class-name",
            size: "200px",
          }}
        >
          <FaPaperPlane />
        </IconContext.Provider>
        <h1>Jetcord</h1>
        <p>Start a conversation</p>
    </div>
  );
}

export default NoChats
