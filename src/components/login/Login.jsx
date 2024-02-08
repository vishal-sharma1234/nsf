import React, { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer} from "react-toastify";

const Login = () => {
  let navigate = useNavigate();

  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/v1/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    console.log(data);
    if (data.success) {
      // alert(data.userEmail);
      // alert(data.userWebToken);
      localStorage.setItem("userEmail", data.userEmail);
      localStorage.setItem("userWebToken", data.userWebToken);
      localStorage.setItem("userType", data.userType);
      // alert(data.length);
      localStorage.setItem("cartLength", data.length);
      navigate("/");
    } else {
      // alert(data.message);
      toast.error("User not found!");

    }
  };

  const onSet = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-page-container">
      <ToastContainer/>
      <form action="" className="login-form" onSubmit={handleSubmit}>
        <h6>Login...</h6>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email *"
          autoComplete="new-email"
          onChange={onSet}
          required={true}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password *"
          // autoComplete="new-email"
          onChange={onSet}
          required={true}
        />
        <input type="submit" value="Login" id="login-btn" />
      </form>
    </div>
  );
};

export default Login;
