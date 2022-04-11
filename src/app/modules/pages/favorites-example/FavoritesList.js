import React from "react";
import FavoriteItem from "./FavoriteItem";
import { Container, Row, Col } from "react-bootstrap";
export default function FavoritesList() {
  const arrayList = [
    {
      id: 1,
      name: "test1",
    },
    {
      id: 2,
      name: "test2",
    },
    {
      id: 3,
      name: "test3",
    }
  ];

  return (
    <>
      <br></br>
      <h1>Favorites</h1>
      <Container>
        <Row>
          {arrayList.map((item) => {
            return (
              <Col sm={4}>
                <FavoriteItem data={item} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
