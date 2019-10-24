import React from "react";
import useUser from "../dummy-presenter/User";
// import useUser from "../presenter/User";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

export default function ProfilePage(props) {
  const { user, isLoading } = useUser();

  return (
    <Container>
      <Col>
        <Card>
          <Card.Title>
            
          </Card.Title>
          <Card.Body>

          </Card.Body>

        </Card>
      </Col>
      <Col>
      </Col>

  <div>
      <h2>
      {isLoading && "Loading..."}
      {!isLoading && user && `ID: ${user.id}`}
      </h2>
    </div>
    </Container>
  );
}