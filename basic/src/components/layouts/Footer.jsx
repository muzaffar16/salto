import React from 'react';
import {Link} from "react-router-dom";
import { Container, Row, Col,Carousel } from "react-bootstrap"

const Footer = () => {
  return (
    <footer>
       <Container>
        <Row>
          <Col sm={6} lg={3} className="mb-4 mb-lg-0">
            <div className="text-center">
              <h5>
                Location
             </h5>
             <p>
              5505 Waterford District</p>
             <p>
             Dr, Miami, FL 33126
             </p>
             <p> 
             United States
             </p>
            </div>
          </Col>
          <Col sm={6} lg={3} className="mb-4 mb-lg-0">
            <div className="text-center">
              <h5>
              Working Hours
             </h5>
             <p>
             Mon-Fri: 9:00AM - 10:00PM</p>
             <p>
             Saturday: 10:00AM - 8:30PM
             </p>
             <p> 
             Sunday: 12:00PM - 5:00PM
             </p>
            </div>
          </Col>
          <Col sm={6} lg={3} className="mb-4 mb-lg-0">
            <div className="text-center">
              <h5>
              Order Now
             </h5>
             <p>
             Quaerat neque purus ipsum</p>
             <p>
             <Link to="tel:99988877777" className="calling"></Link>
             </p>
            </div>
          </Col>
          <Col sm={6} lg={3} className="mb-4 mb-lg-0">
            <div className="text-center">
              <h5>
              Follow Us
             </h5>
             <p>
             Quaerat neque purus ipsum
             </p>
             <ul className="list-unstyled text-center mt-2">
              <li>
                <Link to="/">
                <i class="bi bi-facebook"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                <i class="bi bi-twitter-x"></i>
                </Link>
                </li>
                <li>
                <Link to="/">
                <i class="bi bi-instagram"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                <i class="bi bi-linkedin"></i>
                </Link>
              </li>
             </ul>
             
            </div>
          </Col>
        </Row>
        <Row className="copy_right">
           <Col>
               <div>
                <ul className="list-unstyled text center mb-0">
                <li>
                <Link to="/">
                Powered by:
                  <span>
                   Muzaffar Ali | Sahir Hasan | Fakhurddin
                  </span>
               
                </Link>
                 </li>
                </ul>
               </div>
           </Col>
        </Row>
       </Container>
    </footer>
  )
}

export default Footer
