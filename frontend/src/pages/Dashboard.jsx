import { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import forest from "../assets/images/forest.jpg";
import building from "../assets/images/building.jpg";

gsap.registerPlugin(ScrollTrigger);

export const Dashboard = () => {
  const [checkLang, setCheckLang] = useState(true);
  const [changeMargin, setChangeMargin] = useState("marginLeft");
  const [lang, setLang] = useState("அ");
  const [tamil, setTamil] = useState({
    headLine: `“இயற்கையை நேசி, அது உன்னை வாழவைக்கும்”`,
    feature1: `கண்டறிதல்`,
    feature12: `சட்டவிரோத கட்டிடங்கள்`,
    feature13: `காடுகளில் 🌲`,
    feature2: `எங்கள் அமைப்பு மேம்பட்ட தொழில்நுட்பத்தை பயன்படுத்தி காடு பகுதிகளை
            கண்காணித்து, அனுமதியில்லாத கட்டிடங்களை அடையாளம் கண்டு, இயற்கையை
            பாதுகாக்கவும் வனவிலங்குகளை பாதுகாக்கவும் உதவுகிறது.`,
    impact1:` தொழில்நுட்பமும் சுற்றுச்சூழல் பாதுகாப்பும் இணைந்து, பசுமையான
              எதிர்காலத்தை உருவாக்கி, காடுகளை எதிர்கால தலைமுறைகளுக்காக
              பாதுகாக்கும் அமைப்பு.`,
    impact2: `காடுகளில் சட்டவிரோத கட்டிடங்கள் வனச்சேதம் மற்றும் சுற்றுச்சூழல்
              பாதிப்பை ஏற்படுத்துகின்றன. எங்கள் தொழில்நுட்பம் காடுகளை திறம்பட
              கண்காணித்து பாதுகாக்க உதவுகிறது.`,
    vision: `“ஒவ்வொரு மரமும் மதிப்புமிக்கது.”`,
  });
  const [english, setEnglish] = useState({
  headLine: "“Love nature, it will sustain you”",
  feature1: "Detect",
  feature12: "Illegal Buildings",
  feature13: "in Forests 🌲",
  feature2: "Our system uses advanced technology to monitor forest areas and identify unauthorized constructions, helping protect nature and preserve wildlife.",
  impact1: "A system that combines technology and environmental conservation to build a greener future and protect forests for future generations.",
  impact2: "Illegal construction in forests leads to deforestation and environmental damage. Our technology helps monitor and protect forests efficiently.",
  vision: "“Every tree is valuable.”",
});
  const boxRef = useRef();
  const navRef = useRef();
  useEffect(() => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  }, []);
  const timelineApple = gsap.timeline({});
  useEffect(() => {
    (gsap.to(navRef.current, {
      backgroundColor: "rgb(213,255,209)",
      position: "fixed",
      color: "black",
      height: "11vh",
      duration: 5,
      ease: "back.in",
      scrollTrigger: {
        trigger: navRef.current,
        start: "bottom 10%",
        scrub: true,
      },
    }),
      gsap.to(navRef.current, {
        y: -200,
        duration: 5,
        opacity: 0,
        ease: "elastic",
        scrollTrigger: {
          trigger: "#box2",

          start: "top 10%",
          end: "top 5%",
          scrub: true,
          toggleActions: "restart none none none",
        },
      }),
      gsap.to("#box31", {
        height: "0%",
        duration: 5,
        ease: "elastic",
        scrollTrigger: {
          trigger: "#box3",
          start: "top 10%",
          end: "bottom 10%",
          scrub: true,
          toggleActions: "restart none none none",
        },
      }),
      gsap.to(".box311", {
        opacity: 1,
        height: "80%",
        scrollTrigger: {
          trigger: ".box311",
          start: "top 99%",
          end: "bottom 70%",
          scrub: true,
          toggleActions: "restart none none none",
        },
      }),
      gsap.to(".box312", {
        opacity: 1,
        width: "24%",
        scrollTrigger: {
          trigger: ".box312",
          start: "top 99%",
          end: "bottom 70%",
          scrub: true,
          toggleActions: "restart none none none",
        },
      }),
      gsap.to("#box32", {
        height: "100vh",
        scrollTrigger: {
          trigger: "#box32",
          start: "top 90%",
          end: "bottom 70%",
          scrub: true,
          toggleActions: "restart none none none",
        },
      }));
  }, []);
  const handleLang = () => {
    if (checkLang) {
      setLang("அ");
      setCheckLang(false);
    } else {
      setLang("A");
      setCheckLang(true);
    }
  };
  return (
    <div className="Dashboard-container">
      <div
        ref={navRef}
        className="w-[100%] h-[10vh] bg-white flex justify-between items-center z-10"
      >
        <div className="w-[10%] h-[80%]"></div>
        <div className="w-[60%] h-[80%] flex justify-between items-center">
          <nav className="w-[80%] h-[100%] flex justify-between  items-center font-montserrat font-semibold">
            <a href="">Home</a>
            <a href="#box221">Features</a>
            <a href="#box3">Impact</a>
            <a href="#box32">Vision</a>
          </nav>
          <div
            style={{ padding: "0.1rem" }}
            className="bg-[rgb(152,152,152)] w-[10%] h-[60%] rounded-2xl flex items-center"  onClick={handleLang}
          >
            <div
              style={
                lang == "அ"
                  ? { marginRight: "auto", transition: "margin-left 1s linear" }
                  : { marginLeft: "auto" }
              }
              className="rounded-[100%] w-[40%] h-[90%] bg-[rgb(28,28,28)] text-center text-white"
             
            >
              <h1>{lang}</h1>
            </div>
          </div>
        </div>
        <div className="w-[10%] h-[80%] flex justify-between items-center font-semibold">
          <Link to={"/login"}>Sign in</Link>
        </div>
      </div>
      <div
        id={"box1"}
        className="pt-10 w-full h-[100vh] bg-white-100 text-black bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: `url(${handtree})` }}
      >
        <div className="w-150 h-50 absolute left-210 top--20  flex justify-end items-start rounded-lg font-Poppins">
          <h1
            style={{ fontFamily: "Inter", paddingLeft: "2rem" }}
            className="text-3xl  p-6 text-black font-bold text-center" 
          >
            {lang=='அ' ? tamil.headLine: english.headLine}
          </h1>
        </div>
      </div>
      <div
        id="box2"
        className="w-full h-[100vh] bg-white-400 flex items-center justify-center"
      >
        <div
          id="box221"
          className="w-1/2 h-full flex items-center justify-center p-10  m-10"
        >
          <h1 className="text-1xl md:text-4xl font-bold  text-black">
            { lang=='அ' ? tamil.feature1:english.feature1} <br />
            {lang=='அ' ? tamil.feature12:english.feature12} <br />
            {lang=='அ' ? tamil.feature13:english.feature13}
          </h1>
        </div>

        <div className="w-1/2 h-full flex items-center justify-center p-10 ">
          <p className="text-lg md:text-xl text-gray-700  max-w-md">
           {lang=='அ' ? tamil.feature2:english.feature2}
          </p>
        </div>
      </div>
      <div id="box3" className="w-full h-[100vh] bg-white">
        <div
          id="box31"
          className="w-[100%] h-[50%] bg-white-400 flex justify-evenly items-center"
        >
          <div
            className="box311 w-[24%] h-[0%] opacity-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${forest})` }}
          ></div>
          <div className="box312 w-[0%] h-[80%] bg-white-100 opacity-0 overflow-hidden flex justify-center items-center ">
            <p className="text-lg md:text-xl text-gray-700 max-w-md font-normal">
              {" "}
              {lang=='அ' ? tamil.impact1:english.impact1}
            </p>
          </div>
          <div className="box311 w-[0.3%] h-[100%] bg-white opacity-0"></div>
          <div className="box312 w-[0%] h-[80%] bg-white-100 opacity-0 overflow-hidden flex justify-center items-center">
            <p className="text-lg md:text-xl text-gray-700  max-w-md font-normal ">
             {lang=='அ' ? tamil.impact2:english.impact2}
            </p>
          </div>
          <div
            className="box311 w-[24%] h-[0%] bg-white-100 opacity-0 bg-cover bg-center bg-no-repeat "
            style={{ backgroundImage: `url(${building})` }}
          ></div>
        </div>
        <div
          id="box32"
          className="w-[100%] h-[100%] bg-white-400 flex justify-center items-center "
        >
          <p className="text-8xl text-gray-300 mt-4 italic font-bold text-center leading-2xl">
            {lang=='அ' ? tamil.vision:english.vision}
          </p>
        </div>
      </div>
    </div>
  );
};
