import React from "react";
import imgdp from "../assets/profile.jpg";
import fetchData from "../utils";

const SearchedUser = ({ res, setChats, setSearchResult, setInputField }) => {
  const fetchedChats = async (reciver) => {
    setChats([]);
    try {
      const { data } = await fetchData.post("/newChat", null, {
        headers: {
          Authorization: `Beare ${sessionStorage.getItem("token")}`,
          reciverEmail: reciver,
        },
      });
      setChats(data.chats);
      setSearchResult([]);
      setInputField("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="chat-card searched" onClick={() => fetchedChats(res.email)}>
      <div className="profile-img">
        <img src={imgdp} alt="" />
      </div>
      <div className="chat-info">
        <div className="chat-name">{res.name}</div>
        <div className="chat-email">{res.email}</div>
      </div>
    </div>
  );
};

export default SearchedUser;
