import React, { useState} from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../../../assets/logo.png";

export function Header() {
  const location = useLocation();
  
  const { isAuthorized,user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      user: auth.user
    }),
    shallowEqual
  );

  return (
    <div>
      <Navbar expand="md" variant="dark" className="header">
        <Navbar.Brand className="ms-5">
          <div className="header-logo">
          <Link style={{ textDecoration: "none" }} to="/dashboard">
            <img src={logo}/>
          </Link>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end me-5">
          {isAuthorized ? (
            <Nav>
              <Nav.Link>
              <Link style={{ textDecoration: "none", color:"white" }} to="/">Hi {
                  user.username
                } </Link>
              </Nav.Link>
              <Nav.Link>
                <Link style={{ textDecoration: "none", color:"white" }} to="/favorites">
                  Favorites
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link style={{ textDecoration: "none", color: "#FFC300" }} to="/logout">
                  Sign Out
                </Link>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              {location.pathname.includes("/home") ? (
                <Nav.Link>
                  <Link
                    style={{ textDecoration: "none", color: "#FFC300" }}
                    to="/auth/login"
                  >
                    Login
                  </Link>
                </Nav.Link>
              ) : location.pathname.includes("/auth/signup") ? (
                <Nav.Link>
                  <Link
                    style={{ textDecoration: "none", color: "#FFC300" }}
                    to="/auth/login"
                  >
                    Login
                  </Link>
                </Nav.Link>
              ) : (
                <Nav.Link>
                  <Link
                    style={{ textDecoration: "none", color: "#FFC300" }}
                    to="/auth/signup"
                  >
                    Signup
                  </Link>
                </Nav.Link>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
