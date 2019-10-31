import React from "react";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default function HomePage(props) {
  return (
    
    <Container>
      <Row>
        <Col>
          <Card className="text-center">
          <Card.Header>
            Notifications
          </Card.Header>
          <Card.Body>
            <Card.Text>* Notifications shown here * 
            </Card.Text>
          </Card.Body>    
          </Card>
        </Col>
        <Col xs={6}>
          <Card className="text-center">
            <Card.Header>
              Today's Training
            </Card.Header>
            <Card.Body>
              <Card.Text>* Workout shown here * 
              </Card.Text>
            </Card.Body>    
          </Card>
        </Col> 
      </Row>
    </Container>
  


    
  );
}
