import React from "react";
import useUser from "../dummy-presenter/User";
// import useUser from "../presenter/User";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner'

export default function ProfilePage(props) {
  const { user, isLoading } = useUser();

  return (
    <>
      {isLoading && (
        <Spinner animation="grow">
          <span className="sr-only">Loading...</span>
        </Spinner>)}
      {!isLoading && user && (
        <Container>
          <Col sm={4}>
            <Card>
              <Card.Title>
                General Information
              </Card.Title>
              <Card.Body>
                Height: {user.height}    
              </Card.Body>    
            </Card>
          </Col>
          <Col>
          </Col>
        </Container>
      )}
    </>
  );
}