import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import fetchData from "./utils";
import MainPage from "./pages/MainPage";

const PrivateRoute2 = () => {
  console.log("entered in private route");
  const queryClient = useQueryClient();
  const { username } = useParams();
  // useEffect(() => {
  //   queryClient.invalidateQueries({ queryKey: ["validateUser"] });
  // }, []);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["validateUser"],
    queryFn: () => {
      return fetchData("/validate", {
        params: { username },
        headers: { Authorization: sessionStorage.getItem("token") },
      });
    },
  });
  console.log(isLoading);
  if (!isLoading) {
    console.log(data.data);
    if (!data.data) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("name");
      return <Navigate to="/login" />;
      // return <MainPage />;
    }
  }
  return <MainPage />;
};

export default PrivateRoute2;
