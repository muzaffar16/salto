import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../../assets/logo/salto_logo.png";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import location from "../../assets/location.png";

import "../../styles/HeaderStyle.css";

const Header = ({setShowArea}) => {
    const [nav, setNav] = useState(false);

    // Scroll Navbar
    const changeValueOnScroll = () => {
        const scrollValue = document?.documentElement?.scrollTop;

        if (scrollValue > 100) {
            setNav(true);
        } else {
            setNav(false);
        }
    };

    window.addEventListener("scroll", changeValueOnScroll);

    return (
        <header>
            <Navbar collapseOnSelect expand="md" className={`${nav === true ? "sticky" : ""}`}>
                <Container>
                    <Navbar.Brand href="#home">
                        <Link to="/" className="logo"> <img src={Logo} alt="Logo" /></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>

                            <Nav.Link as={Link} to="/about">
                                About
                            </Nav.Link>

                            <Nav.Link as={Link} to="/menu">
                                Our Menu
                            </Nav.Link>

                            <Nav.Link as={Link} to="/myOrder">
                                My orders
                            </Nav.Link>

                            <Nav.Link as={Link} to="/cart">
                                <div className="cart">
                                    <i className="bi bi-bag fs-5"></i>
                                    <em className="roundpoint">2</em>
                                </div>
                            </Nav.Link>

                            
                                <button onClick={()=>setShowArea(true)} className="area-btn "><img src={location} alt="" /></button>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
