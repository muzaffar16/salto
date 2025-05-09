import React from 'react'
import Layout from "../../components/layouts/layout";
import About_section1 from './About_section1';
import Section5 from "../Home/Section5"
import  "@/styles/About.css";
function About() {
  return (
    <>
   <Layout>
    {/* About us Page */}
     < About_section1/>
     <Section5/>
   </Layout>
    </>
  )
}

export default About
