import React, { Component, useState } from "react";
import "./NavBar.css";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../../img/logo.png";
// import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
  return (
    <div>
      <Navbar
        style={{ overflow: "hidden", padding: "0 .5rem", height: "7vh" }}
        className="shadow-sm bg-white"
      >
        <Navbar.Brand id="logo-anchor">
          <img id="nav-bar-logo" src={Logo} alt="" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="logout-navbar-nav">
          <Nav className="ml-auto my-auto">
            <span className="navbar-right-content my-auto fw-bold">
              {/* Display user information */}
              <span className="text-muted">
                {props.loginInfo["Name"]}
              </span> | {props.loginInfo["Email"]}
            </span>
            <button
              onClick={props.onLogout}
              style={{ cursor: "pointer" }}
              className="btn navbar-right-content"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
