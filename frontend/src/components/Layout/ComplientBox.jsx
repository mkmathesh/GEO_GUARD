import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ComplientBox.css";
import axios from "axios";
export const ComplientBox = (props) => {
  const { fullName, phoneNumber, email, location, description, date, status } =
    props.data;
  const [arrow, setArrow] = useState("🔻");
  const [check, setCheck] = useState(false);

  const handleArrow = () => {
    if (arrow == "🔻") {
      setArrow("🔺");
      setCheck(true);
    } else {
      setArrow("🔻");
      setCheck(false);
    }
  };
  const nav = useNavigate();
    const handleclick = async () => {
      try {
         
        const data={
          status:status=="pending"?"inspection":"completed"
        }
       
        const res=await axios.put(
          `http://localhost:3000/api/complaint/complaintupdate/${props.data._id}`,data
        );
        console.log(res.success);
         props.checker(Date.now());
        
        
      } catch (error) {}
    };
  return (
    <div
      className="Complientbox-container"
      style={{ backgroundColor: "rgb(94, 225, 255)" }}
    >
      <div className="complientbox">
        <h1>Name:{fullName}</h1>
        <h1>Location:{location}</h1>
        <h1>Date:{date}</h1>
        <p className="text-3xl cursor-pointer ;" onClick={handleArrow}>
          {arrow}
        </p>
      </div>
      {check && (
        <div
          style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            backgroundColor: "rgb(255, 255, 255)",
            marginTop: "2rem",
          }}
          className="border-2 border-[rgb(0,0,0)] w-full h-auto"
        ><table>
  <thead>
    <tr className="border-2">
      <th >Gmail</th>
      <th>PhoneNumber</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-2 text-center">
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>{description}</td>
    </tr>
  </tbody>
</table>
        </div>
      )}
      {check && (
        <div className=" w-full h-20 p-5 flex justify-end items-center">
          <button
            onClick={handleclick}
            style={{
              backgroundColor: "rgb(255, 102, 0)",
              padding: "0.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
              marginRight: "1rem",
              width: "100px",
              borderRadius: "1rem",
            }}
          >
            {status == "pending" ? "inspection" : "completed"}
          </button>
        </div>
      )}
     
    </div>
  );
};
