import React from "react";
import "./navbar_style.css";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-red navbar-dark">
        <div className="wrapper"></div>
        <div className="container-fluid all-show">
          <NavLink className="navbar-brand w-25 p-0 m-0" to="/">
            <img
              src="./e-commerce-high-resolution-logo-transparent.png"
              alt=""
              className="p-0 m-0"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
              <li className="nav-item"></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
