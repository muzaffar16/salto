import React, { useState, useContext } from "react";
import "@/styles/LoginPopUp.css";
import crossIcon from "@/assets/crossIcon.png";
import axios from "axios";
import { TokenContext } from "../../Context/TokenContext";
import { EmailContext } from "../../Context/EmailContext"; 
import { toast } from 'react-toastify';

const url = `${import.meta.env.VITE_backend_url}`;

const LoginPopup = ({ setShowLogin }) => {
  const { setToken } = useContext(TokenContext);  
  const { setEmail } = useContext(EmailContext); 

  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Store email in context
    if (name === "email") {
      setEmail(value);
    }

    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    // Validate name if signing up
    if (currState === "Sign Up") {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(data.name.trim())) {
        toast.error("Name must contain only alphabetic characters (A-Z or a-z).");
        return;
      }
    }

    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        setEmail(data.email);
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", data.email);
        setShowLogin(false);
      } else {
        toast.error(response.data.message);  // Show error in toast
      }
    } catch (error) {
      console.error("Error during login/signup:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img className="cross-icon" onClick={() => setShowLogin(false)} src={crossIcon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
