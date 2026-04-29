import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { Complient } from "./Complient";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./UserHome.css";
gsap.registerPlugin(ScrollTrigger);
export const UserHome = () => {
  const [checkLang, setCheckLang] = useState(true);
  const [changeMargin, setChangeMargin] = useState("marginLeft");
  const [lang, setLang] = useState("அ");
  const navRef = useRef();
  const [tamil, setTamil] = useState({
    p1: `சரியான தகவல் வழங்கவும்`,
    p2: `இடத்தை தெளிவாக குறிப்பிடவும்`,
    p3: `விவரத்தை சுருக்கமாக எழுதவும்`,
    p4: `தொடர்பு விவரம் அவசியம்`,
    p5: `புகைப்படம் சேர்ப்பது நல்லது`,
    p6: `தவறான புகார்கள் அளிக்க வேண்டாம்`,
    p7: `அவசர நிலைமையில் உடனடி தகவல் தெரிவிக்கவும்`,
    l1: `பெயர்:`,
    l2: `தொலைபேசி எண்:`,
    l3: `மின்னஞ்சல்:`,
    l4: `இருப்பிடம்:`,
    l5: `படம்:`,
    l6: `விளக்கம்:`,
    b: `சமர்ப்பிக்கவும்`,
    cr: `புகார் தேவைகள்`,
    h1: `காடுகளை பாதுகாப்போம் சட்டவிரோத கட்டிடங்களை தெரிவிப்போம்`,
    h2: `உங்கள் அருகிலுள்ள காடுகளில் நடைபெறும் சட்டவிரோத கட்டிடங்களை புகார் செய்ய உதவுங்கள்`,
  });
  const [english, setEnglish] = useState({
    p1: `Provide accurate information`,
    p2: `Mention the exact location clearly`,
    p3: `Write a brief and clear description`,
    p4: `Contact details are required`,
    p5: `Uploading an image is recommended`,
    p6: `Do not submit false complaints`,
    p7: `Report immediately in case of urgent issues`,
    l1: "Name:",
    l2: "Phone Number:",
    l3: "Email:",
    l4: "Location:",
    l5: "Image:",
    l6: "Description:",
    b: "Submit",
    cr: `Complaint Requirements`,
    h1: `காடுகளை பாதுகாப்போம் சட்டவிரோத கட்டிடங்களை தெரிவிப்போம்`,
    h2: `உங்கள் அருகிலுள்ள காடுகளில் நடைபெறும் சட்டவிரோத கட்டிடங்களை புகார் செய்ய உதவுங்கள்`,
  });
  const handleLang = () => {
    if (checkLang) {
      setLang("அ");
      setCheckLang(false);
    } else {
      setLang("A");
      setCheckLang(true);
    }
  };
  useEffect(() => {
    gsap.to(navRef.current, {
      backgroundColor: "rgb(213,255,209)",
      position: "fixed",
      color: "black",
      height: "90px",
      duration: 5,
      ease: "back.in",
      scrollTrigger: {
        trigger: navRef.current,
        start: "bottom 10%",
        scrub: true,
      },
    });
  }, []);
  return (
    <div className="UserHome-container">
      <div
        ref={navRef}
        className="userNavBar flex justify-between items-center position-fixed"
      >
        <div className="w-[10%] h-[80%]"></div>
        <div className="w-[60%] h-[80%] flex justify-between items-center">
          <nav className="w-[80%] h-[100%] flex justify-between  items-center font-montserrat font-semibold">
            <a href="#userMainBox1">Home</a>
            <a href="#userMainBox2">Complaint</a>
            <a href="#userMainBox3">Details</a>
            <a href="#userMainBox4">Vision</a>
          </nav>
          <div
            style={{ padding: "0.1rem" }}
            className="bg-[rgb(152,152,152)] w-[10%] h-[60%] rounded-2xl flex items-center"
            onClick={handleLang}
          >
            <div
              style={
                lang == "அ"
                  ? { marginRight: "auto", transition: "margin-left 1s linear" }
                  : { marginLeft: "auto" }
              }
              className="rounded-[100%] w-[40%] h-[90%] bg-[rgb(28,28,28)] text-center text-white"
            >
              <h1 className="text-center">{lang}</h1>
            </div>
          </div>
        </div>
        <div className="w-[10%] h-[80%] flex justify-between items-center font-semibold">
          <Link to={"/"}>Sign out</Link>
        </div>
      </div>

      <div className="userNavSlider"></div>
      <div className="userMain">
        <div id="userMainBox1" className="flex-col content-center text-center">
          <h1 className="text-bold text-2xl">
            🌳{lang == "அ"?tamil.h1:english.h1}🌳
          </h1>
          <p>
            ({lang == "அ"?tamil.h2:english.h2})
          </p>
        </div>
        <div id="userMainBox2">
          <Complient lang={lang == "அ" ? tamil : english} />
        </div>
        <div id="userMainBox3"></div>
        <div id="userMainBox4"></div>
      </div>
    </div>
  );
};
