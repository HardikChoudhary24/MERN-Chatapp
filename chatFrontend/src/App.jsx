import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Login, Signup, Main } from "./pages/index";
import {action as loginAction} from "./pages/Login";
import {action as signupAction} from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./PrivateRoute";
import MainPage, { loader as allChatsLoader } from "./pages/MainPage";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Navigate to="/login"/>
  },
  {
    path: "/login",
    element: <Login />,
    action:loginAction
  },
  {
    path: "/signup",
    element: <Signup />,
    action:signupAction
  },
  {
    path: "/dashboard/:username",
    loader:allChatsLoader,
    element: <MainPage/>,
  },
]);
const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
