import React, { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { GiphyFetch } from "@giphy/js-fetch-api";

export default function Error() {
  const giphy = new GiphyFetch("KN85AKZvPoWj10aofG7zkn5ZKEiXaZGC");
  const [errorUrl, setErrorUrl] = useState("");
  useEffect(() => {
    fetchData();
    async function fetchData() {
      const { data: gif } = await giphy.gif("C21GGDOpKT6Z4VuXyn");
      setErrorUrl(gif.images.original.url);
    }
  }, []);

  return (
    <Row className="justify-content-md-center">
      <Image src={errorUrl} fluid={true} />
    </Row>
  );
}
