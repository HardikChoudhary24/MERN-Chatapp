import React from "react";
import SearchedUser from "./SearchedUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchData from "../utils";

const Search = ({ searchResult,isError }) => {
  if (isError) {
    return (
      <>
        <p className="status">No user found </p>
        <>
          <hr className="seperator" /> <p className="status">Your chats</p>
        </>
      </>
    );
  }
  return (
    <>
      {searchResult.map((res) => (
        <SearchedUser res={res} />
      ))}
      {searchResult.length !== 0 && (
        <>
          <hr className="seperator" />{" "}
          <p className="status">Your chats</p>
        </>
      )}
    </>
  );
};

export default Search;
