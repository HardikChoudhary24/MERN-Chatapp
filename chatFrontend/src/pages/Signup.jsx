import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import axios from "axios";
import fetchData from "../utils";
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
        <h2>Welcome Back!</h2>
        <p>Let's get you signed in</p>
        <input
          type="text"
          placeholder="Username"
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
      </Form>
      <Link className="redirect-link" to="/login">
        <button className="signup-redirect">Login</button>
      </Link>
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
        theme="light"
      />
    </div>
  );
};

export default signup;
