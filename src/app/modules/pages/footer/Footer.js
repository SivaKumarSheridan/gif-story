import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./Footer.css";

export function Footer() {

return(
    <div className="footer">
            <Container>
                <Link to="/" style={{ textDecoration: "none", color:"black" }}>
                    <h3><strong>GS</strong></h3>
                    </Link>
            <p>copyright © 2022 all rights reserved</p>
            </Container>
        </div>
);

}