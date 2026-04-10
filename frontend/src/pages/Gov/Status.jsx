import React, { useEffect } from "react";
import complaints from "../../data/complient.json";
import { ComplientBox } from "../../components/Layout/ComplientBox";
import "./ComplientView.css";
import axios from "axios";
import { useState } from "react";
export const Status = () => {
  const [data, setdata] = useState([]);
  const [search,setsearch]=useState("");
  useEffect(() => {
    const fetchdata=async()=>{
      try {
        const res=await axios.get(
          "http://localhost:3000/api/complaint/complaintview",
        );
        setdata(res.data.data);
      } catch (error) {
       
    }
  }
    fetchdata();
  }, []);
  return (
    <div className="Complientview-container">
      <div className="complientview-search">
        <label htmlFor="">Search</label>
        <input type="text" value={search} onChange={(e)=>setsearch(e.target.value)}/>
      </div>
      <h1 className="text-white text-3xl font-bold">Complaints Status</h1>
      {
      data.map((value, index) => (
        value.fullName.includes(search) && <ComplientBox key={index} data={value}/>
      ))}
      <div></div>
    </div>
  );
};
