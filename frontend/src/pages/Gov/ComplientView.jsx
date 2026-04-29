import React, { useEffect } from "react";
import { ComplientBox } from "../../components/Layout/ComplientBox";
import { Bounce, Slide, ToastContainer, Zoom, toast } from "react-toastify";
import "./ComplientView.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { useState } from "react";
export const ComplientView = () => {
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState("");
  const [status, setstatus] = useState("pending");
  const [searchItem, setSearchItem] = useState("");
  const [checker, setChecker] = useState(0);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    console.log(checker);
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          "https://geo-guard-69nu.onrender.com/api/complaint/complaintview",
        );

        setdata(res.data.data);
      } catch (error) {}
    };

    fetchdata();
    if (checker > 0) {
      toast.success("Updated successfully", {
        position: "top-center",
      });
    }
  }, [checker]);
  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Name",
      "Location",
      "Date",
      "Email",
      "Phone",
      "Description",
    ];

    const tableRows = [];

    data.forEach((item) => {
      const rowData = [
        item.fullName,
        item.location,
        item.date,
        item.email,
        item.phoneNumber,
        item.description,
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("sample.pdf");
  };

  return (
    <div className="Complientview-container">
      <div className="Complientview-navBox bg-gray-500 text-white font-bold">
        <div className="navlink" onClick={() => setstatus("pending")}>
          Pending
        </div>
        <div className="navlink" onClick={() => setstatus("inspection")}>
          Inspection
        </div>
        <div className="navlink" onClick={() => setstatus("completed")}>
          Completed
        </div>
      </div>
      <div className="complientview-search">
        <div style={{ marginRight: "auto", fontWeight: "bold", width: "8%" }}>
          <button
            onClick={generatePDF}
            style={{
              background: "tomato",
              padding: "0.5rem",
              borderRadius: "0.2rem",
              width: "100%",
            }}
          >
            PDF
          </button>
        </div>
        <div className="border-2 bg-white h-auto w-[10%]">
          <select
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            id=""
            className="h-[100%] w-[100%] border-0"
          >
            <option value="fullName">Name</option>
            <option value="location">Location</option>
            <option value="date">Date</option>
          </select>
        </div>
        <label className="text-black" htmlFor="">
          Search
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
      </div>
      <h1 className="mt-4 text-black text-3xl font-bold">{status}</h1>
      {data
        .filter((value) => {
          const field = value[searchItem]?.toString().toLowerCase() || "";
          return (
            field.includes(search.toLowerCase()) && value.status === status
          );
        })
        .map((value, index) => (
          <ComplientBox key={index} data={value} checker={setChecker} />
        ))}

      <ToastContainer />
    </div>
  );
};
