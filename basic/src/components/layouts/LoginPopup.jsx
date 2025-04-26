import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use navigate to pass data
import { useAreaContext } from "../../Context/AreaContext"; 
// import "../../styles/LoginPopup.css";
import crossIcon from "../../assets/crossicon.png";


const LoginPopup = ({setShowLogin}) => {

  // const [currState,setCurrState]=useState("Sign Up")
  const [currState,setCurrState]=useState("Login")
  return (
    <div className="login-popup">
       <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img  onClick={()=>setShowLogin(false)} src={crossIcon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState=="Login"?<></>:<input type="text" placeholder="Your name" required />}
      
          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button>{currState=="Sign Up" ? "Create account" : "Login"}</button>
       </form>
    </div>
  )
}

export default LoginPopup
