import { useEffect, useState } from "react";
import "./Dashboard.css";
import { HomeAnimation } from "./Animation";
import { InfoBox } from "../components/Layout/InfoBox";
export const Dashboard = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  useEffect(() => {
    HomeAnimation();
  }, []);
  const info = [
    "Protect Tamil Nadu’s forests from illegal buildings. Track constructions in protected areas quickly and report violations to help preserve nature.",
    "Monitor forest boundaries regularly and identify unauthorized constructions early. Document violations with photos and coordinate with local authorities.",
    "Volunteer for forest patrols, submit locations via our map, share alerts with other watchers, and contribute to forest preservation efforts.",
  ];

  return (
    <div className="Dashboard_container">
      <div className="box box1">
        <div className="w-[50%] h-[100%] bg-[rgb(135,255,141)] my-auto flex justify-center items-center flex-col">
          
        </div>
        <div className="w-[50%] h-[100%] bg-[rgb(135,255,141)] flex-col content-center">
          <h1 className="text-white text-2xl font-bold w-auto h-auto">save <span className="font-bold text-5xl text-[rgb(0,147,29)]">Forest</span></h1>
          <h1 className="text-white text-2xl font-bold w-auto h-auto">Save <span className="font-bold text-5xl text-[rgb(0,147,29)]">Future</span></h1>
        </div>
      </div>
      <div className="box box2">
        <div className="w-[70%] h-[100%] bg-[rgb(135,255,141)]"></div>
        <div className="w-[30%] h-[100%] bg-[rgb(135,255,141)]">
          <div className="image-box">
            {info.map((value, i) => (
              <InfoBox data={value} key={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="box box3">
        <div className="w-[50%] h-[100%] bg-[rgb(135,255,141)]"></div>
        <div className="w-[50%] h-[100%] bg-[rgb(135,255,141)]">
        </div>
      </div>
    </div>
  );
};
