import React, { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
// import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

const Input = ({ socket, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const queryClient = useQueryClient();
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const message = {
        chatId: room,
        sender: sessionStorage.getItem("id"),
        content: currentMessage,
        time: "5:27am",
      };
      socket.emit("send_msg", message);
    }
    setCurrentMessage("");
    await queryClient.invalidateQueries({ queryKey: ["messages"] });
  };
  const sendMessageOnEnter = async (e) => {
    if (e.key === "Enter") {
      if (currentMessage !== "") {
        const message = {
          chatId: room,
          sender: sessionStorage.getItem("id"),
          content: currentMessage,
          time: "5:27am",
        };
        socket.emit("send_msg", message);
      }
      setCurrentMessage("");
      await queryClient.invalidateQueries({ queryKey: ["messages"] });
    }
  };
  return (
    <div className="mssg-input">
      <button className="image-btn">
        <BiImageAdd className="add-image" />
      </button>
      <input
        type="text"
        placeholder="Type a message"
        value={currentMessage}
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
        onKeyDown={(e)=>sendMessageOnEnter(e)}
      />
      <button className="send-btn" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default Input;
