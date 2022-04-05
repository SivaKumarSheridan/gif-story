import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const Banner = () => {
  return (
    <Row>
      <Card className="text-center bg-secondary text-white my-5 py-4">
        <Card.Body>
          Join Gif Story today! Don't let your memes be dreams!
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Banner;
