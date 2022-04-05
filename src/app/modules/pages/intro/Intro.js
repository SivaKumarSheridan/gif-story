import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

const Intro = () => {
  return (
    <Row>
      <Col sm={7}>
        <Image src="https://picsum.photos/900/400" fluid rounded className="" />
      </Col>
      <Col sm={5}>
        <h1 className="font-weight-light">Gif Story</h1>
        <p className="mt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
          dolore vitae nostrum laboriosam hic, omnis molestiae odit inventore
          facilis quasi exercitationem vel quos modi illo aperiam? Tempore vel
          voluptate quaerat impedit et, quidem delectus blanditiis, tempora
          amet, aspernatur id culpa. Obcaecati ipsum inventore ex doloremque?
          Suscipit eum quia molestias natus?
        </p>
        <Button variant="outline-info">Join Gif Story</Button>
      </Col>
    </Row>
  );
};

export default Intro;
