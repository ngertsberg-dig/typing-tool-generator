import { TweenMax, Power4 } from "gsap";
export const popupMessage = ( message, type ) =>{
    const err = document.querySelector("#errorContainer");
    err.textContent = message;
    if(type.toLowerCase() === "error"){
        err.style.backgroundColor = "#E23636";
    }
    else if(type.toLowerCase() === "success"){
        err.style.backgroundColor = "#27ae60";
    }
    TweenMax.set(err,{y: 0});
    TweenMax.set(err,{display: "inline"});
    TweenMax.to(err,0.5,{y:-125,ease:Power4.easeOut,onComplete:()=>{
        TweenMax.to(err,0.25,{y:0,delay:3,ease:Power4.easeIn,onComplete:()=>{
            TweenMax.set(err,{display:"none",y:0,});
        }})
    }});
}