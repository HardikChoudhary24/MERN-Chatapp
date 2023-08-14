import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import fetchData from "../utils";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";

const Messages = ({ chatPerson, socket, setRoom }) => {
  const [messageList, setMessageList] = useState([]);
  const [chat, setChat] = useState({});
  const queryClient = useQueryClient();
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };
  useEffect(()=>{
    scrollToBottom();
  },[messageList]);

  const { data, isLoading } = useQuery({
    queryKey: ["messages", chatPerson.userId],
    queryFn: (context) => {
      const userId = context.queryKey[1];
      return fetchData.get("/messages", {
        headers: {
          Authorization: `Beare ${sessionStorage.getItem("token")}`,
          person: userId,
          author: sessionStorage.getItem("id"),
        },
      });
    },
  });
  // useEffect(()=>{
  //   let chat = {};
  // },[])
  // if (!isLoading) {
  //   console.log(data);
  //   chat = data.data.chat;
  // }

  useEffect(() => {
    if (!isLoading) {
      // console.log(data.data);
      setChat(data.data.chat);
      setMessageList(chat?.messageList);
    }
  }, [data]);

  useEffect(() => {
    if (chat?.chatId !== undefined) {
      setRoom(chat.chatId);
      socket.emit("join_room", chat.chatId);
    }
    setMessageList(chat?.messageList);
    console.log(messageList);
  }, [chat]);

  useEffect(() => {
    socket.on("receive_msg", async (data) => {
      // console.log(data);
      setMessageList([...messageList, data]);
      await queryClient.invalidateQueries({ queryKey: ["messages"] });
      // console.log(messageList)
    });
  }, [socket]);
  return (
    <div className="messages" ref={scrollContainerRef}>
      {messageList?.map((msg) => {
        return <Message msg={msg} />;
      })}
    </div>
  );
};

export default Messages;
