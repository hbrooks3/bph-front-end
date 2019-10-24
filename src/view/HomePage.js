import React from "react";

import Image from "react-bootstrap/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Squat from "./squatTest.jpg";


export default function HomePage(props) {
  return (
    <div>
      <h2>Home</h2>
      <Container>
        <Row>
          <Col>
            <Image src={Squat} rounded />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
