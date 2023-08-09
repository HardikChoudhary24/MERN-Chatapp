import React, { useEffect, useState } from 'react'
import Message from './Message'
import {io} from "socket.io-client"

const Messages = () => {
  const [msg,setMsg] = useState("");
  useEffect(()=>{
    const socket = io("http://localhost:3000");

    socket.on("connect" , ()=>{
      setMsg(`you connected with id ${socket.id}`);
    })

  },[])
  return (
    <div className='messages'>
        <Message msg={msg}/>
    </div>
  )
}

export default Messages
