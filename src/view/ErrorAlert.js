// react
import React from "react";

// react-bootstrap
import Alert from 'react-bootstrap/Alert';

export default function ErrorAlert({heading, message, callback}) {
  return (
    <Alert variant="danger" onClose={callback} dismissible>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}