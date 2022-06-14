import React, { useState } from "react";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import art1 from "../Images/corouselart1.jpg";
import { useForm } from "react-hook-form";

function Cards() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (userObj) => {
    console.log(userObj);
  };

  return (
    <div>
      <Row xs={1} md={3} className="g-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Col>
            <Card>
              <Card.Img variant="top" src={art1} />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <Button className="float-right" variant="primary" onClick={handleShow}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-unstyled">
            <li>
              <b>Name:</b>
            </li>
            <li>
              <b>Artist:</b>
            </li>
            <li>
              <b>Price:</b>
            </li>
            <li>
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <div>
                  <label>
                    <b>Quantity:</b>
                  </label>
                  <input type="number" id="pass" className="form-control" />
                </div>
              </form>
            </li>
            <li>
              <b>Description:</b>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            AddToCart
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Cards;