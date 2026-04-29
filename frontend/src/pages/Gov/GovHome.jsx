import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./GovHome.css";
export const GovHome = () => {
  const [data, setdata] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [ongoingCount, setOngoingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [tableSize, setTableSize] = useState(false);
  const [tableStyle, setTableStyle] = useState({
    height: "auto",
  });
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          "https://geo-guard-69nu.onrender.com/api/complaint/complaintview",
        );
        setdata(res.data.data);

        res.data.data.map((value, index) => {
          if (value.status == "pending") {
            setPendingCount((pendingCount) => pendingCount + 1);
          } else if (value.status == "completed") {
            setCompletedCount((completedCount) => completedCount + 1);
          } else {
            setOngoingCount((ongoingCount) => ongoingCount + 1);
          }
        });
      } catch (error) {}
    };
    console.log(data.length);
    fetchdata();
  }, []);
  const handleTableClick = () => {
    if (!tableSize) {
      setTableStyle({ height: "0px" });
      setTableSize(true);
    } else {
      setTableStyle({ height: "auto" });
      setTableSize(false);
    }
  };
  return (
    <div className="GovHome-container">
      <div className="w-full h-[500px] bg-white flex justify-evenly items-center">
        <div className="w-[25%] h-[40%] bg-[rgb(255,140,0)] rounded-lg flex-col content-center  hover:h-[45%]">
          <h1 className="text-center font-bold text-3xl">Pending</h1>
          <h1 className="text-center font-bold text-2xl">{pendingCount}</h1>
        </div>
        <div className="w-[25%] h-[40%] bg-[rgb(0,221,255)] rounded-lg flex-col content-center  hover:h-[45%]">
          <h1 className="text-center font-bold text-3xl">Under Insepection</h1>
          <h1 className="text-center font-bold text-2xl">{ongoingCount}</h1>
        </div>
        <div className="w-[25%] h-[40%] bg-[rgb(0,170,0)] rounded-lg flex-col content-center hover:h-[45%]">
          <h1 className="text-center font-bold text-3xl">Completed</h1>
          <h1 className="text-center font-bold text-2xl">{completedCount}</h1>
        </div>
      </div>
      <div style={{marginBottom:"5em"}} className="w-[80%] h-auto  flex-col justify-evenly items-center border-2 border-black ">
        <div className="border-2 flex justify-center">
          <h1
            className="text-center inline hover:text-blue-800"
            onClick={handleTableClick}
          >
            Data
          </h1>
        </div>
        <div className="w-full overflow-hidden" style={tableStyle}>
          <table  className="w-full h-full ">
            <thead>
              <tr className="bg-blue-300 border-2">
                <th>s.no</th>
                <th>Fullname</th>
                <th>PhoneNumber</th>
                <th>Email</th>
                <th>Location</th>
                <th>Date</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, index) => (
                <tr key={index} className="border-2 text-center">
                  <td>{index}</td>
                  <td>{value.fullName}</td>
                  <td>{value.phoneNumber}</td>
                  <td>{value.email}</td>
                  <td>{value.location}</td>
                  <td>{value.date}</td>
                  <td>{value.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
