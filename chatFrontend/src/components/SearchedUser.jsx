import React from 'react'
import imgdp from "../assets/profile.jpg";

const SearchedUser = ({res}) => {
    return (
      <div className="chat-card searched">
        <div className="profile-img">
          <img src={imgdp} alt="" />
        </div>
        <div className="chat-info">
          <div className="chat-name">{res.name}</div>
          <div className="chat-email">{res.email}</div>
        </div>
      </div>
    );
}

export default SearchedUser
