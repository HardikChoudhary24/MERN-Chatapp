import React, { useEffect, useRef, useState } from "react";
import {
  IoMdArrowBack,
  FaPaperPlane,
  BsPatchCheckFill,
  RiPencilFill,
  IconContext,
  MdOutlineLogout,
} from "../assets/icons";
import imgdp from "../assets/profile.jpg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import fetchData from "../utils";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ sidebarRef, toggle, openProfile }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userPhotoRef = useRef(null);
  const [updateName, setUpdateName] = useState(false);
  const [name, setName] = useState(sessionStorage.getItem("name"));

  // to get the userName from the backend
  const { data, isLoading } = useQuery({
    queryKey: ["username"],
    queryFn: () =>
      fetchData("/getUser", {
        headers: { Authorization: `Beare ${sessionStorage.getItem("token")}` },
      }),
  });

  if (!isLoading) {
    sessionStorage.setItem("name", data.data.username);
  }

  //to update the name
  const { mutate: putName } = useMutation({
    mutationFn: () => {
      setUpdateName(false);
      return fetchData.patch(
        "/updateUsername",
        {
          name,
        },
        {
          headers: {
            Authorization: `Beare ${sessionStorage.getItem("token")}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["username"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const changeEditState = () => {
    setUpdateName(true);
  };

  const changeName = (e) => {
    setName(e.target.value);
  };
  const style = {
    width: toggle
      ? `${userPhotoRef.current.getBoundingClientRect().width}px`
      : "0px",
  };

  const logout = () => {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className={`user-profile ${toggle ? "revel" : ""}`} style={style}>
      <div className="header">
        <button className="back-btn" onClick={openProfile}>
          <IconContext.Provider
            value={{
              color: "#4d61d1",
              className: "global-class-name",
              size: "30px",
            }}
          >
            <IoMdArrowBack />
          </IconContext.Provider>
        </button>
        <IconContext.Provider
          value={{
            color: "#4d61d1",
            className: "global-class-name",
            size: "40px",
          }}
        >
          <FaPaperPlane />
        </IconContext.Provider>
      </div>
      <div className="profile-photo" ref={userPhotoRef}>
        <img src={imgdp} alt="user-photo" className="revealing-image" />
      </div>
      <div className="user-info">
        <label htmlFor="">Username</label>
        <div
          style={{ borderBottom: updateName ? "2px solid #344bd3" : "none" }}
        >
          <input
            type="text"
            value={name}
            disabled={!updateName}
            onChange={changeName}
          />
          {updateName ? (
            <button className="edit-btn" onClick={putName}>
              <IconContext.Provider
                value={{
                  color: "#4d61d1",
                  className: "global-class-name",
                  size: "20px",
                }}
              >
                <BsPatchCheckFill />
              </IconContext.Provider>
            </button>
          ) : (
            <button className="edit-btn" onClick={changeEditState}>
              <IconContext.Provider
                value={{
                  color: "#7b7b7d",
                  className: "global-class-name",
                  size: "20px",
                }}
              >
                <RiPencilFill />
              </IconContext.Provider>
            </button>
          )}
        </div>
        <button className="logout" onClick={logout}>
          <p>Logout</p>
          <MdOutlineLogout className="logout-icon" />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
