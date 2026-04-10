import React from 'react'
import {useNavigate} from "react-router-dom";
import "./ComplientBox.css";
export const ComplientBox = ({data}) => {
    const {fullName,phoneNumber,email,location,description,date,status}=data;
    const nav=useNavigate();
    const handleclick=()=>{
      nav("/officer/check",{
        state:{
          data
      }})
    }
  return (
    <div className='Complientbox-container' onClick={handleclick}>
      <div className='complientbox1'>
         <h3>Name:{fullName}</h3>
    <p>Phonenumber:{phoneNumber}</p>
    <p>Email:{email}</p>
    <p>Location:{location}</p>
    
      </div>
      <div className="complientbox2">
        <p>Description:{description}</p>
      </div>
      <div className='complientbox3 flex-col justify-evenly items-center' >
        
        <p>{
          status?"🔴":"🟢"
          }</p>
          <p>Date:{date}/</p>
      </div>
    </div>
  )
}
