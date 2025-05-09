import React from 'react'
import { Link } from "react-router-dom";
// index.js or App.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import Outlet1 from "@/assets/outlets/outlet1.jpg" 

function About_section1() {
  return (
    <section className='aboutus' >
      <div className="main_heading">
        <h3>A few words</h3>
        <h1>About us</h1>
      </div>
      <div className="section2">
        <div className="first">
          <h1>
            We’re passionate about our food
          </h1>
          <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
      <div className="section3">
        <div className="box">
          <div className="logo">
          <i aria-hidden="true" class="fas fa-shipping-fast"></i>
            </div>
          <h2>
            Free Shipping on
            First Order
          </h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</p>
        </div>
        <div className="box">
          <div className="logo">
          <i aria-hidden="true" class="fas fa-hamburger"></i>
          </div>
          <h2>Variety of
            Dishes
          </h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</p>
        </div>
        <div className="box">
          <div className="logo">
          <i aria-hidden="true" class="fas fa-clock"></i>
          </div>
          <h2>Thirty Minutes
            Delivery</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</p>
        </div>
      </div>
      <div className="section4">
        <div className="heading">
        <p>HISTORY</p>
        <h1>Our journey starts way back in 1975</h1>
        </div>
        <div className="background">
          <div className="box">
               <h1>Origins</h1>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A optio ex fugit ratione, laborum consequatur modi totam! Dolor assumenda, quae voluptatem, fugiat beatae asperiores ducimus atque harum rerum natus saepe?</p>
          </div>
          <div className="divider"></div>
          <div className="box">
          <h1>Story</h1>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A optio ex fugit ratione, laborum consequatur modi totam! Dolor assumenda, quae voluptatem, fugiat beatae asperiores ducimus atque harum rerum natus saepe?</p>
          </div>
        </div>
      </div>
      <div className="section5">
      <div className="heading">
        <p>Our Outlets</p>
        <h1>Find an Outlet Near You</h1>
        </div>
        <div className="outlets">
          <div className="outletcard">
            <div className="img">
              <img src={Outlet1} alt="" />
            </div>
            <div className="part2">
            <div className="location">
            <i aria-hidden="true" class="fas fa-map-marker-alt"></i>
            </div>
            <div className="text">
              <h5>762 Fulton St San Francisco, California(CA), 94102</h5>
              <Link to="/about"><p>Phone: 123-456-7890</p></Link>
            </div>
            </div>
          </div>
          <div className="outletcard">
            <div className="img">
              <img src={Outlet1} alt="" />
            </div>
            <div className="part2">
            <div className="location">
            <i aria-hidden="true" class="fas fa-map-marker-alt"></i>
            </div>
            <div className="text">
              <h5>762 Fulton St San Francisco, California(CA), 94102</h5>
              <Link to="/about"><p>Phone: 123-456-7890</p></Link>
            </div>
            </div>
          </div>
          </div>
      </div>
    </section >
  )
}

export default About_section1
