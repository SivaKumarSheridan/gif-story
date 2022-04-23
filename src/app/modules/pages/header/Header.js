import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import resume from "../../../assets/resume.pdf";
import logo from "../../../assets/logo.png";
export function Header() {
  const { isAuthorized, user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      user: auth.user,
    }),
    shallowEqual
  );

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Navbar.Brand>
          <img
            alt=""
            src={logo}
            width="120"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end me-5">
          <Nav>
            <Nav.Link>
              <Link style={{ textDecoration: "none" }} to="/home">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <a
                onClick={()=>{
                  window.open("https://firebasestorage.googleapis.com/v0/b/portfolio-gayathri.appspot.com/o/resume.pdf?alt=media&token=44b38857-578f-4889-9b6e-3f9775aab2c8")
                }}
                style={{ textDecoration: "none",color:"#007bff" }}
                download
              >
                Resume
              </a>
            </Nav.Link>
            <Nav.Link>
              <a
                onClick={() => {
                  document.getElementById("works").scrollIntoView();
                }}
                style={{ textDecoration: "none",color:"#007bff" }}
                to="/work"
              >
                Work
              </a>
            </Nav.Link>
            <Nav.Link>
              <a
                onClick={() => {
                  document.getElementById("about").scrollIntoView();
                }}
                style={{ textDecoration: "none",color:"#007bff" }}
                to="/about"
              >
                About
              </a>
            </Nav.Link>
            <Nav.Link>
              <Link style={{ textDecoration: "none" }} to="/contact">
                Contact
              </Link>
            </Nav.Link>
            {isAuthorized && (
              <Nav.Link>
                <Link style={{ textDecoration: "none" }} to="/logout">
                  Sign out
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
