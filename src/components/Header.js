import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import { Navbar, Nav } from 'react-bootstrap';
import logo from './logo.png'

function Header() {
    return (

<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">
    <img
        alt="logo"
        src={logo}
        width="130"
        height="60"
        className="d-inline-block align-top"
      />
      
    </Navbar.Brand>
    <Nav className="justify-content-end" style={{ width: "100%" }}>
    <Nav.Item>
      <Nav.Link href="/about">Who is Toby?</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/login">Login</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/signup">Signup</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/products" disabled>
        Products
      </Nav.Link>
    </Nav.Item>
  </Nav>
  </Navbar>









    )}











   
  
  export default Header;
  