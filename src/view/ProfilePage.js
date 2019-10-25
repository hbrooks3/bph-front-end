import React from "react";
import useUser from "../dummy-presenter/User";
// import useUser from "../presenter/User";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'

export default function ProfilePage(props) {
  const { user, isLoading } = useUser();
  //com

  return (
    <>
      {isLoading && (
        <Spinner animation="grow">
          <span className="sr-only">Loading...</span>
        </Spinner>)}
      {!isLoading && user && (
        <Container>
          <Col sm={4}>
            <Row>
              <Card className="text-center">
                <Card.Title>
                  General Information
                </Card.Title>
                <Card.Body>
                  {`Height: ${user.height}
                  Weight: ${user.weight}
                  Age: ${user.age}`}
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Card className="text-center">
                <Card.Title>
                  General Information
                </Card.Title>
                <Card.Body>
                  <Card.Text>Height: {user.height}</Card.Text>
                  <Card.Text>Height: {user.height}</Card.Text>
                  <Card.Text>Height: {user.height}</Card.Text>
                </Card.Body>    
              </Card>

            </Row>
            
          </Col>
          <Col>
          </Col>
        </Container>
      )}
    </>
  );
}