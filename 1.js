import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

function Header() {
  return (
    <nav>
      <ul>
      <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/shop"}>Products</Link>
        </li>
        <li>
          <Link to={"/about"}>Our Brand</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;



import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import { Navbar } from 'react-bootstrap';


