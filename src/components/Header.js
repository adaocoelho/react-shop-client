import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

function Header() {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={"/"} classNAme="brand-logo">
          Home
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to={"/shop"}>Products</Link>
          </li>
          <li>
            <Link to={"/about"}>Our Brand</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
