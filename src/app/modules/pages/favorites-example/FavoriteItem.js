import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Fav.scss";

export default function FavoriteItem({ data }) {
  return (
    <Col xs={12} md={8}>
      <h2>{data.id}</h2>
      <h2>{data.createdDate}</h2>
      <h2>{data.quote}</h2>
      <img src={data.img1} alt="" />
      <img src={data.img2} alt="" />
      <img src={data.img3} alt="" />
      <h2>{data.isFav}</h2>
    </Col>
  );
}
