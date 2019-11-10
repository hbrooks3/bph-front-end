// React imports
import React from "react";

// Bootstrap Imports
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';


export default function HomePage(props) {
  return (
    <CardColumns>
      <Card className="text-center">
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
      <Card className="text-center">
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
    </CardColumns>    
  );
}
