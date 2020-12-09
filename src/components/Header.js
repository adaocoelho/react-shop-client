import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import { Navbar, Nav } from 'react-bootstrap';

function Header() {
    return (

<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">
    <img
        alt="logo"
        src="#"
        width="100"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      T#
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
  