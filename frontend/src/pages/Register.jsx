import React from "react";
import "./Register.css";
import axios from "axios";
import { Bounce, Slide, ToastContainer, Zoom, toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Register = ({ close }) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [gmail, setgmail] = useState("");
  const nav = useNavigate();
  const handleregister = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: gmail,
      password: password,
      role: "user",
    };
    try {
      const res = axios.post("http://localhost:3000/api/auth/register", data);
      nav("/login");
      console.log(res);
      if (res.data.error === "Invaild email format") {
        toast.warning("Invaild email format");
      } else {
      }
    } catch (err) {}
  };
  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-title">
          <h3>Sign up</h3>
        </div>
        <div className="register-form">
          <form action="" onSubmit={handleregister}>
            <label htmlFor="">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <br />
            <label htmlFor="">Gmail</label>
            <input
              type="text"
              value={gmail}
              onChange={(e) => setgmail(e.target.value)}
            />
            <br />
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button type="submit">Sign up</button>
            <p className="login" onClick={() => nav("/login")} type="submit">
              Sign in
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
