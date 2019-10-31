import React from "react";
import useUser from "../dummy-presenter/User";
// import useUser from "../presenter/User";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

function ChangePasswordForm(props) {
  return (
    <div>
      Add form here
    </div>
  );
}

function PageBody(props) {
  const user = props.user;

  return (
    <CardColumns>
      <Card className="text-center">
        <Card.Header>
          General Information
        </Card.Header>
        <Card.Body>
          <Card.Text>Height: {user.height}</Card.Text>
          <Card.Text>Weight: {user.weight}</Card.Text>
          <Card.Text>Age: {user.age}</Card.Text>
        </Card.Body>    
      </Card>
      <Card className="text-center">
        <Card.Header>
          Contact Information
        </Card.Header>
        <Card.Body>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Text>Phone Number: {user.phoneNumber}</Card.Text>
        </Card.Body>    
      </Card>
      <Card className="text-center">
        <Card.Header>
          Change Password
        </Card.Header>
        <Card.Body>
          <ChangePasswordForm />
        </Card.Body>    
      </Card>
    </CardColumns>
  )
}

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
          <Row>
          
          </Row>
          <Row>
            <PageBody user={user} />
          </Row>
        </Container>
        
      )}
    </>
  );
}