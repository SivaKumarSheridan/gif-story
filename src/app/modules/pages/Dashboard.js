import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Dashboard.css";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GifMaker from "./gif-maker/GifMaker";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Dashboard() {
  const [quotes, setQuotes] = useState("Hello World");

  useEffect(() => {
    setQuotes(
      "Sample Quote dvdsvs dv ds efesewwef wef ffefefw efwefwe dskjf  dsfdsf "
    );
  }, []);

  return (
    <>
      <div className="hero-banner">
        <Container>
          <h1 className="hero-title ">
            Random Quote Generator <br />& Try the new Gif Story
          </h1>
          <Row className="justify-content-md-center hero-quotes">
            <Col className="quotes-div" md={{ span: 6, offset: 2 }}>
              <p style={{ paddingTop: "10px" }}>{quotes}</p>
            </Col>

            <Col xs lg="2" className="d-flex align-items-center quotes-copy">
              <FontAwesomeIcon
                icon={faCopy}
                size="2x"
                style={{ cursor: "pointer" }}
              />
            </Col>
          </Row>
          <div className="default-btn quotes-button">GENERATE NEW QUOTE</div>
        </Container>
      </div>

      <Container className="info">
        <h1 class="info-title">Create your own meme</h1>
        <Row>
          <Col sm>
            <h3 className="info-1">1</h3>
            <p>Search for the genre of memes you are looking for </p>
          </Col>
          <Col sm>
            <h3 className="info-2">2</h3>
            <p>Drag and drop the quotes onto the meme maker</p>
          </Col>
          <Col sm>
            <h3 className="info-3">3</h3>
            <p>Replace gifs to please your like and order. Save it</p>
          </Col>
        </Row>
      </Container>
      <DndProvider backend={HTML5Backend}>
        <GifMaker />
      </DndProvider>
    </>
  );
}
