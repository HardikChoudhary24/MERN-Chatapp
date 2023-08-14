import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import fetchData from "../utils";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPaperPlane, IconContext } from "../assets/icons";


export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const res = await fetchData.post("/login", data);
    sessionStorage.setItem("name", res?.data?.name);
    sessionStorage.setItem("token", res?.data?.token);
    return redirect(`/dashboard/${res.data.name}`);
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return null;
};
const Login = () => {
  return (
    <div className="container">
      <Form className="form-container" method="POST">
        <IconContext.Provider
          value={{
            color: "#4d61d1",
            className: "global-class-name logo",
            size: "90px",
          }}
        >
          <FaPaperPlane />
        </IconContext.Provider>
        <h2>Login to your Account</h2>
        <p>Connect and chat with anyone, anywhere</p>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          required
        />
        <button className="login-btn">Login to Your Account</button>
        <p className="redirect-info">
          Not a member yet?{" "}
          <span>
            <Link className="redirect-link" to="/signup">
              <button className="signup-redirect">Register Now</button>
            </Link>
          </span>
        </p>
      </Form>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
