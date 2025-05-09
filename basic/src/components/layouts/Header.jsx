import React, { useState, useContext } from 'react';  // ✅ Also import useContext
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "@/assets/logo/salto_logo.png";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from "react-router-dom";
import "@/styles/HeaderStyle.css";

import { TokenContext } from "../../Context/TokenContext";  // ✅ Import your TokenContext

const Header = ({ setShowLogin }) => {
    const [nav, setNav] = useState(false);

    const { token, setToken } = useContext(TokenContext);  // ✅ Access token and setToken

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

    const navigate = useNavigate();

    const logout=()=>{
        localStorage.removeItem("token")
        setToken("")
        navigate("/")

    }
    const myOrder=()=>{
        navigate("/myOrder")
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="md" className={`${nav ? "sticky" : ""}`}>
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

                            <Nav.Link as={Link} to="/cart">
                                <div className="cart">
                                    <i className="bi bi-bag fs-5"></i>
                                </div>
                            </Nav.Link>

                            {/* Check token and conditionally show Login or Logout button */}
                            <Nav.Link>
                                {!token ? (
                                    <button className='sign-in' onClick={()=>setShowLogin(true)}>
                                        Sign in
                                    </button>
                                ) : (
                                    <div className="navbar-profile">
                                    <i className="bi bi-person-circle fs-4" style={{ paddingTop: 0 }}></i>
                                    <ul className="nav-profile-dropdown">
                                        <li onClick={myOrder}>
                                            <i className="bi bi-bag fs-5"></i>
                                            <p>Orders</p>
                                        </li>
                                        <hr />
                                        <li onClick={logout}>
                                            <i className="bi bi-box-arrow-left"></i>
                                            <p>Logout</p>
                                        </li>
                                    </ul>
                                </div>
                                
                                )}
                            </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
