// src/pages/home/Home.jsx   (adjust the path to your structure)
import React, { useEffect, useState } from "react";
import Layout    from "../../components/layouts/layout";
import "../../styles/HomeStyle.css";
import Section1  from "./Section1";
import Section2  from "./Section2";
import Section3  from "./Section3";
import Section4  from "./Section4";
import Section5  from "./Section5";
import Section6  from "./Section6";
import Section7  from "./Section7";

// import widgetUrl from "../../../chatbot-widget.js?url";

const Home = ({ setShowLogin }) => {
  const [showChat] = useState(false);   
//   useEffect(() => {
//   if (!widgetUrl) {
//     console.error("Chatbot widget URL not found");
//     return;
//   }

//   const script = document.createElement("script");
//   script.src = widgetUrl;
//   script.defer = true;
//   script.dataset.licensekey =
//     "9ff5f1aa1f46a73564db010a1f1ebd69";
//   document.body.appendChild(script);

//   return () => {
//     document.body.removeChild(script);
//   };
// }, []);


  return (
    <>
      <Layout setShowLogin={setShowLogin}>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
      </Layout>
      {/* The widget script adds the iframe automatically; no extra JSX needed */}
      {/* <div class="chatbot-container">
      <iframe
        src="http://localhost:5173/?licenseKey=9ff5f1aa1f46a73564db010a1f1ebd69"
        title="Support Chatbot"
        allow="clipboard-write"
      ></iframe>
    </div> */}
    </>
  );
};

export default Home;
