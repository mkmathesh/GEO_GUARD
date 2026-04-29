import React from "react";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const Login = ({ close }) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [user, setuser] = useState("mk");
  const nav = useNavigate();
  const handlelogin = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    try {
      const response = await axios.post(
        "https://geo-guard-69nu.onrender.com/api/auth/login",
        data,
        
      );
      console.log(response);
      localStorage.setItem("username", response.data.data.username);
      localStorage.setItem("role", response.data.data.role);
      if (response.data.data.role === "user") {
        nav("/user");
      } else if (response.data.data.role === "admin") {
        nav("/admin");
      } else if (response.data.data.role === "officer") {
        nav("/officer");
      }
    } catch (err) {}
  };
  return (
    <div className="Login-container">
      <div className="login-box">
        <div className="login-title">
          <h3>Sign in</h3>
        </div>
        <div className="login-form">
          <form action="" onSubmit={handlelogin}>
            <label htmlFor="">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <br />
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button type="submit">Sign in</button>
            <p className="register" onClick={() => nav("/register")}>
              Sign up
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
