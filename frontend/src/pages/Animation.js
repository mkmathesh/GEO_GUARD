import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

export const HomeAnimation = () => {
  const boxes = gsap.utils.toArray(".Infobox-container");
  boxes.map((box,i)=>{
    gsap.to(box, {
      y:-100,
      opacity:0,
      duration:1,
     scrollTrigger: {
      trigger:box,
      start:"10%",
      end:"80%",
      scrub: true,
    },
    
  });
  })
  
};
