import React from "react";
import "./Complient.css";
import compimage from "../../assets/Images/complient.png";
import { useState } from "react";
import axios from "axios";
export const Complient = () => {
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
  }
 catch(err)
 {

 }
  
}
  return (
    <div className="complient-container">
      <div className="complient-title"></div>
      <div className="complient-box">
        <form action="" onSubmit={handlecomplient}>
          <label htmlFor="">Name</label>
          <input type="text" value={name} onChange={(e)=>setname(e.target.value)}/>
          <label htmlFor="">Phone.no</label>
          <input type="text" value={Phone_number} onChange={(e)=>setphone_number(e.target.value)}/>
          <label htmlFor="">Gmail</label>
          <input type="text" value={gmail} onChange={(e)=>setgmail(e.target.value)}/>
          <label htmlFor="">Location</label>
          <input type="text" value={location} onChange={(e)=>setlocation(e.target.value)}/>
          <label htmlFor="">Image</label>
          <input type="file" />
          <label htmlFor="">Description</label>
          <textarea name="" id="" value={description} onChange={(e)=>setdescription(e.target.value)}></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="complientimage-container">

      </div>
      <div className="requirement-container">
        <h3>Complaint Requirements</h3>{" "}
        <ul>
          {" "}
          <li>சரியான தகவல் வழங்கவும்</li>
           <p>Provide accurate information</p>{" "}
          <br /> <li>இடத்தை தெளிவாக குறிப்பிடவும்</li>{" "}
          <p>Mention the exact location clearly</p> <br />{" "}
          <li>விவரத்தை சுருக்கமாக எழுதவும்</li>{" "}
          <p>Write a brief and clear description</p> <br />{" "}
          <li>தொடர்பு விவரம் அவசியம்</li> <p>Contact details are required</p>{" "}
          <br /> <li>புகைப்படம் சேர்ப்பது நல்லது</li>{" "}
          <p>Uploading an image is recommended</p> <br />{" "}
          <li>தவறான புகார்கள் அளிக்க வேண்டாம்</li>{" "}
          <p>Do not submit false complaints</p> <br />{" "}
          <li>அவசர நிலைமையில் உடனடி தகவல் தெரிவிக்கவும்</li>{" "}
          <p>Report immediately in case of urgent issues</p> <br />{" "}
        </ul>
      </div>
      <div className="space-container">
        
      </div>
    </div>
  );
};
