import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import fetchData from "../utils";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        <h2>Welcome Back!</h2>
        <p>Let's get you signed in</p>
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
        <button className="login-btn">Login</button>
      </Form>
      <Link className="redirect-link" to="/signup">
        <button className="signup-redirect">Sign up</button>
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

export default Login;
