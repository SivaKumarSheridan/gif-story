import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Container, Form, Button, Table } from "react-bootstrap";
import "./Contact.css";
import firebase from "../../../firebase/firebase";
export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const[list,setList] = useState([]);
    useEffect(()=>{

        async function fetchData() {
            
            const contactList = await firebase.retrievecontactList();
            contactList.onSnapshot((snapshot) => {
              const response = snapshot.docs.map((doc) => ({
                ...doc.data(),
              }));
              setList(response);
            });
          }
          fetchData();

    },[])
    
  const { isAuthorized, user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      user: auth.user,
    }),
    shallowEqual
  );

  const handleSubmit =()=>{
    firebase.insertContactDetails({
      name:name,
      email:email,
      message:message
  });
  window.alert("Message Submitted");
  }


  return (
    <>{
      isAuthorized ? (
        <div style={{marginTop:"30px",paddingBottom:"30px"}}>
          <Container>
          <Table striped bordered hover>
  <thead>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Email</th>
      <th>Message</th>
    </tr>
  </thead>
  <tbody>
  {list.map((item,i) => {
    return(<tr>
      <td>{i}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.message}</td>
    </tr>)
  })}
    
  </tbody>
</Table>
          </Container>
        </div>
      ):
    
      (<div>
        <Container>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="John Doe"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="name@example.com"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Message</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <div className="mb-2">
              <Button variant="primary" size="lg" onClick={handleSubmit}>
                Submit
              </Button>{" "}
            </div>
          </Form>
        </Container>
      </div>)
      }
    </>
  );
}
