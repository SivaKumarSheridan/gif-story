import React, { useState } from "react";
import {
  Row,
  Col,
  Modal,
  Button,
  Image,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import defaultImage from "../../../assets/default.png";
import firebase from "../../../firebase/firebase";
import moment from "moment";
import html2canvas from "html2canvas";
import GIF from "gif.js.optimized"
export default function FavoritesItem({ item }) {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const updateisFavorite = () => {
    item.isFavorite = !item.isFavorite;
    firebase.updateMemeDetails(item);
  };
  var gif = new GIF({
    workers: 2,
    quality: 10,
    width:10,
    height:10
  });
  
  const deleteMeme = () => {
    firebase.deleteMemeDetails(item);
    setShowDeleteModal(false)
  };

  async function sendMemeAsText(){
    const element = document.getElementById('print');
    let canvas = await html2canvas(element);
    // gif.addFrame(element, {delay: 200});
    // gif.on('finished', function(blob) {
    //     window.open(URL.createObjectURL(blob));
    //     console.log(URL.createObjectURL(blob))
    //   });
       
    //   gif.render();
    let data = canvas.toBlob('image/gif');
    let link = document.createElement('a');
 
    link.href = data;
    link.download = 'downloaded-image.gif';
 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <div className="fav-card">
        <Row>
          <Col>
            <i
              onClick={()=>setShowDeleteModal(true)}
              class="fa-solid fa-trash-can"
              style={{ color: "#FF5A5F" }}
            ></i>
          </Col>
          <Col xs={{ span: 2, offset: 3 }}>
            <i
              onClick={() => setShowModal(true)}
              class="fa-regular fa-eye"
            ></i>
          </Col>
        </Row>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div id="print"  className="modal-body">
              <div  className="fav-imgs">
                <Row className="justify-content-md-center">
                  <Col>
                    <Image 
                      fluid={true}
                      src={item.image1 ? item.image1 : defaultImage}
                    />
                  </Col>
                  <Col>
                    <Image
                      fluid={true}
                      src={item.image2 ? item.image2 : defaultImage}
                    />
                  </Col>
                  <Col>
                    <Image
                      fluid={true}
                      src={item.image3 ? item.image3 : defaultImage}
                    />
                  </Col>
                </Row>
              </div>
              <div>
                <p>{item.quotes}</p>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered

        >
          <Modal.Body>
            <div id="print"  className="modal-body">
              <div  className="fav-imgs">
                <Row className="justify-content-md-center">
                  <Col>
                    <Image 
                      fluid={true}
                      src={item.image1 ? item.image1 : defaultImage}
                    />
                  </Col>
                  <Col>
                    <Image
                      fluid={true}
                      src={item.image2 ? item.image2 : defaultImage}
                    />
                  </Col>
                  <Col>
                    <Image
                      fluid={true}
                      src={item.image3 ? item.image3 : defaultImage}
                    />
                  </Col>
                </Row>
              </div>
              <div>
                <p>{item.quotes}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <div>
              <InputGroup className="mb-3">
                <h5 style={{marginTop:"7px"}}>Are you sure you want to Delete this meme?</h5>
                <i onClick={deleteMeme}
                 class="fa-solid fa-check"
                  style={{
                    color: "#40E779",
                    backgroundColor: "green",
                    padding: "13px",
                    borderRadius: "30px",
                    marginLeft:"15px"
                  }}
                ></i>
                <i onClick={()=>setShowDeleteModal(false)}
                 class="fa-solid fa-xmark"
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    padding: "13px",
                    paddingLeft:"15px",
                    paddingRight:"15px",
                    borderRadius: "20px",
                    marginLeft:"15px"
                  }}
                ></i>
              </InputGroup>
            </div>
          </Modal.Footer>
        </Modal>
        <div className="fav-imgs">
          <Row className="justify-content-md-center">
            <Col className="fav-img-body">
              <img src={item.image1 ? item.image1 : defaultImage} />
            </Col>
            <Col>
              <img src={item.image2 ? item.image2 : defaultImage} />
            </Col>
            <Col>
              <img src={item.image3 ? item.image3 : defaultImage} />
            </Col>
          </Row>
        </div>
        <div className="fav-title">
          <p>{item.quotes}</p>
        </div>
        <span style={{ fontWeight: "lighter", color: "#C4C4C4" }}>
          Created on{" "}
          {moment(new Date().setTime(item.creationDate))
            .format("MM/DD/YYYY")}
        </span>
        <div className="fav-footer">
          <Row>
            <Col>
              <i
                onClick={updateisFavorite}
                class="fa-solid fa-heart"
                style={{ color: item.isFavorite ? "#FF5A5F" : "#FFD5CF" }}
              ></i>
            </Col>
            <Col xs={{ span: 2, offset: 3 }}>
              <Link
                to={{
                  pathname: "/edit-meme",
                  search: "memeId=" + item.memeId,
                }}
                style={{
                  TextDecoder: "none",
                  fontWeight: "lighter",
                  color: "#C4C4C4",
                }}
              >
                <u>Edit</u>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
