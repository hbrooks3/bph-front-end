// react
import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingCard(props) {
  return (
    <Card className="text-center">
      <Card.Body>
        <Spinner animation="border" />
      </Card.Body>
    </Card>
  );
}