// react
import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingCardBody(props) {
  return (
    <Card.Body>
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    </Card.Body>
  );
}