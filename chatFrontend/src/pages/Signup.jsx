import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import axios from "axios";
import fetchData from "../utils";
import { FaPaperPlane, IconContext } from "../assets/icons";
import { toast, ToastContainer } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const res = await fetchData.post("/signup", data);
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return null;
  }
};
const signup = () => {
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
        <h2>Create New Account</h2>
        <p>Connect and chat with anyone, anywhere</p>
        <input
          type="text"
          placeholder="Display name"
          name="username"
          id="username"
          required
        />
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
        <button className="login-btn">Sign up</button>
        <p className="redirect-info">
          Already have an account?{" "}
          <span>
            <Link className="redirect-link" to="/login">
              <button className="signup-redirect">Login</button>
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

export default signup;
