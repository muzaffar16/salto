import React from 'react';
import Layout from "../../components/layouts/layout";
import Menu_section from '../menu/Menu_section'
// import FoodMenu from '../menu/FoodMenu'
import  "../../styles/Menu.css";
function Menu() {
  return (
    <>
   <Layout>
    {/* menu Page */}
     < Menu_section/>
   </Layout>
    </>
  )
}

export default Menu
