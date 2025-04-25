import React from 'react'
import Layout from "../../components/layouts/layout";
import  "../../styles/HomeStyle.css";
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import Section6 from './Section6';
import Section7 from './Section7';

const Home = ({setShowArea}) => {
  return (
    <>
      <Layout  setShowArea={setShowArea}>
        {/*Home section hero banner */}
        <Section1/>

        {/* Home section about */}
         <Section2/>

         {/* Home section Menu */}
         <Section3/>

         {/* Home Section 4 Promotion Section */}
         <Section4/>

         {/* Home Section 5 shop */}
         <Section5/>

         {/* Section 6 blog */}
         <Section6/>

         {/* Section 7 contact*/}
         <Section7/>
      </Layout>
    </>
  )
}

export default Home
