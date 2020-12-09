import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={"/"} className="brand-logo">
          Home
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li>
            <Link to={"/shop"}>Products</Link>
          </li>
        <li>
            <Link to={"/about"}>Toby</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/signup"}>Signup</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
