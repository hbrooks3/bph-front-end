import React from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


export default function HomePage(props) {
  return (
    
    <Container>
      <Row>
        <Col>
          <Card className="text-center" style={{ width: '25rem' }}>
          <Card.Header>
            Notifications
          </Card.Header>
          <Card.Body>
            <Card.Text>Notification 1</Card.Text>
            <Card.Text>Notification 2</Card.Text>
            <Card.Text>Notification 3</Card.Text>
            <Card.Text>Notification 4</Card.Text>
          </Card.Body>    
          </Card>
        </Col>
        <Col >
          <Card className="text-center" style={{ width: '40rem' }}>
            <Card.Header>
              Today's Training
            </Card.Header>
            <Card.Body>
              <Card.Text>*</Card.Text>
              <Card.Text>*</Card.Text>
              <Card.Text>* Workout shown here *</Card.Text>
              <Card.Text>*</Card.Text>
              <Card.Text>*</Card.Text>
              <Button variant="primary">View Workout</Button>
            </Card.Body>    
          </Card>
        </Col> 
      </Row>
    </Container>
  


    
  );
}
