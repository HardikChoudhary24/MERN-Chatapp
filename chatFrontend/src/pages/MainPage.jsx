import React, { useRef, useState } from "react";
import {
  FaPaperPlane,
  IoIosPerson,
  IconContext,
  PiPaperPlaneRightFill,
} from "../assets/icons";
import {
  ChatCard,
  UserProfile,
  Input,
  ChatHead,
  Messages,
} from "../components/index";
import Search from "../components/Search";
import { Form } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import fetchData from "../utils";

const MainPage = () => {
  const sidebarRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [inputField, setInputField] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const openProfile = () => {
    setToggle(!toggle);
    setSearchResult([]);
    setInputField("")
  };

  const searchInput = (e) => {
    setInputField(e.target.value);
  };
  const handleSubmit = async (e) => {
    if (inputField === "") {
      toast.error("Please enter the user to be searched");
      return;
    }
    setIsError(false);

    try {
      setIsLoading(true);
      const { data } = await fetchData.get("/userSearch", {
        params: {
          toSearch: inputField,
        },
        headers: {
          Authorization: `Beare ${localStorage.getItem("token")}`,
        },
      });

      setIsLoading(false);
      setSearchResult(data.user);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };
  return (
    <div className="main-container">
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <UserProfile
        sidebarRef={sidebarRef}
        toggle={toggle}
        openProfile={openProfile}
      />
      <div className="sidebar-cont" ref={sidebarRef}>
        <div className="header">
          <IconContext.Provider
            value={{
              color: "#4d61d1",
              className: "global-class-name",
              size: "50px",
            }}
          >
            <FaPaperPlane />
          </IconContext.Provider>
          <div className="friend-req">
            <button className="square" onClick={openProfile}>
              <IconContext.Provider
                value={{
                  color: "#4d61d1",
                  className: "global-class-name",
                  size: "20px",
                }}
              >
                <IoIosPerson />
              </IconContext.Provider>
            </button>
          </div>
        </div>
        {/* <hr className="horizontal-rule" /> */}

        <div className="main-content">
          <div className="input">
            <input
              type="text"
              placeholder="Search or start a new chat"
              className="search-input"
              value={inputField}
              onChange={searchInput}
            />
            <button className="searchBtn" onClick={handleSubmit}>
              <PiPaperPlaneRightFill className="searchPlane" />
            </button>
          </div>
          {isLoading ? (
            <p className="status">Searching...</p>
          ) : (
            <>
              <Search searchResult={searchResult} isError={isError} />
            </>
          )}

          <ChatCard />
        </div>
      </div>
      <div className="mainbar-cont">
        <ChatHead />
        <Messages />
        <Input />
      </div>
    </div>
  );
};

export default MainPage;
