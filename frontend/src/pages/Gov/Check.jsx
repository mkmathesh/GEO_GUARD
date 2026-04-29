import React, { useState } from "react";

function Check() {
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [result, setResult] = useState(null);
  const [percent, setPercent] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("img1", img1);
      formData.append("img2", img2);

      const res = await fetch("http://localhost:3000/api/detect/check", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("API DATA:", data); // ✅ DEBUG

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setPercent(data.percent);
      setStatus(data.status);
      setResult(data.image);

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div style={{ textAlign: "center", background: "#eef2f3", minHeight: "100vh" }}>
      
      <h1 style={{ background:"rgb(0, 213, 255)", color: "white", padding: "1rem" ,border:"2px solid black",marginBottom:"2rem"}}>
        🏢 Land Encroachment Detection System
      </h1>

      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column" ,justifyContent:"center",alignItems:"center",width:"100%",height:"500px"}}>
        <div>
           <input type="file" onChange={(e) => setImg1(e.target.files[0])} required />
        <input type="file" onChange={(e) => setImg2(e.target.files[0])} required />
        </div>
       
        <br />
        <button style={{
          padding: "10px 20px",
          background: "#27ae60",
          color: "white",
          border: "none",
          marginTop: "2rem"
        }}>
          Detect Change
        </button>
      </form>

      {percent !== null && (
        <div style={{ marginTop: "20px" }}>
          <div>{status}</div>
          <div>Change Detected: {percent}%</div>

          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
            
            <div style={card}>
              <h3>Before</h3>
              <img src={URL.createObjectURL(img1)} style={imgStyle} />
            </div>

            <div style={card}>
              <h3>After</h3>
              <img src={URL.createObjectURL(img2)} style={imgStyle} />
            </div>

            <div style={card}>
              <h3>Change Map</h3>
              {result ? (
                <img src={`data:image/png;base64,${result}`} style={imgStyle} />
              ) : (
                <p>Loading...</p>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

const card = {
  background: "white",
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px gray"
};

const imgStyle = {
  width: "250px",
  borderRadius: "10px"
};

export default Check;