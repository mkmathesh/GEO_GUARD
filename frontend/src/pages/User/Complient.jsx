import React from "react";
import "./Complient.css";
import { useState } from "react";
import { Bounce, Slide, ToastContainer, Zoom, toast } from "react-toastify";
import axios from "axios";
export const Complient = (props) => {
  const [name,setname]=useState("")
  const [Phone_number,setphone_number]=useState("")
  const [gmail,setgmail]=useState("")
  const [location,setlocation]=useState("")
  const [description,setdescription]=useState("")
const handlecomplient= async(e)=>{
  e.preventDefault();
  const data={
    fullName:name,
    phoneNumber:Phone_number,
    email:gmail,
    location:location,
    description:description,
    date:new Date().toLocaleDateString()
  }
  try{
     const response=await axios.post("http://localhost:3000/api/complaint/complaintregister",data);
     toast.success("Complaint Registered!", {
            autoClose: 2000,
            position: "top-center",
            theme: "dark",
            transition: Bounce,
            pauseOnHover: false,
          });
  }
 catch(err)
 {

 }
  
}
  return (
    <div className="complient-container">
      <div className="complient-title flex justify-center items-center text-3xl font-bold"></div>
      <div className="complient-box">
        <form action="" onSubmit={handlecomplient}>
          <label htmlFor="">{props.lang.l1}</label>
          <input type="text" value={name} onChange={(e)=>setname(e.target.value)}/>
          <label htmlFor="">{props.lang.l2}</label>
          <input type="text" value={Phone_number} onChange={(e)=>setphone_number(e.target.value)}/>
          <label htmlFor="">{props.lang.l3}</label>
          <input type="text" value={gmail} onChange={(e)=>setgmail(e.target.value)}/>
          <label htmlFor="">{props.lang.l4}</label>
          <input type="text" value={location} onChange={(e)=>setlocation(e.target.value)}/>
          <label htmlFor="">{props.lang.l5}</label>
          <input type="file" />
          <label htmlFor="">{props.lang.l6}</label>
          <textarea name="" id="" value={description} onChange={(e)=>setdescription(e.target.value)}></textarea>
          <button type="submit">{props.lang.b}</button>
        </form>
      </div>
      <div className="complientimage-container">
       
        <div className="requirement-container">
            <h1 className="font-bold text-3xl text-center">{props.lang.cr}</h1>
            <br />
            <ul className="font-bold text-1xl leading-2xl flex flex-col gap-5 ">
              <li>⚫{props.lang.p1}</li>
              <li>⚫{props.lang.p2}</li>
              <li>⚫{props.lang.p3}</li>
              <li>⚫{props.lang.p4}</li>
              <li>⚫{props.lang.p5}</li>
              <li>⚫{props.lang.p6}</li>
              <li>⚫{props.lang.p7}</li>
            </ul>
          </div>
      </div>
     
      <div className="space-container">
        
      </div>
      <ToastContainer/>
    </div>
  );
};
