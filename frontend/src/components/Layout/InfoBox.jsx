import React from 'react'
import "./InfoBox.css";
export const InfoBox = (props) => {
  return (
    <div className='Infobox-container'>
      <p>{props.data}</p>
    </div>
  )
}
