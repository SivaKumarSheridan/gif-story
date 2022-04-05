import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

const Instruction = () => {
  return (
    // <Container className="px-4 my-5">
    <Row>
      <Col>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="https://picsum.photos/id/1/300/200" />
          <Card.Body>
            <Card.Title>Step 1</Card.Title>
            <Card.Text>Search for gifs straight from Giphy!</Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="https://picsum.photos/id/22/300/200" />
          <Card.Body>
            <Card.Title>Step 2</Card.Title>
            <Card.Text>Drag & Drop gifs into our storyboards!</Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="https://picsum.photos/id/33/300/200" />
          <Card.Body>
            <Card.Title>Step 3</Card.Title>
            <Card.Text>
              Save your beautiful creations to your account!
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
      </Col>
    </Row>
    // </Container>
  );
};

export default Instruction;
