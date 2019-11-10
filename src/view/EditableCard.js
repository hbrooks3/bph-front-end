// React imports
import React, {useState} from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function onError(message) {
  console.log(message ? message : 'Error');
}

export default function EditableCard(props) {
  const title = props.title;
  const fields = props.fields;
  const submit = props.submit;
  const reset = props.reset;

  const [locked, setLock] = useState(true);

  function handleSubmit() {
    submit ? submit() : onError('Submit function not defined');
    setLock(true);
  }

  function handleCancel() {
    reset ? reset() : onError('Reset function not defined');
    setLock(true);
  }

  const renderedFields = fields.map((field, index) =>
    <Form.Group key={index}>
      <Form.Label>{field.label}</Form.Label>
      <Form.Control 
        readOnly={locked}
        value={field.value}
        onChange={event => field.update(event.target.value)}
      />
    </Form.Group>
  );

  const buttonBar =
    locked ?
    <Button onClick={() => setLock(false)}>Edit</Button> :
    <>
      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </>;

  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Form>{renderedFields}</Form>
      </Card.Body>
      <Card.Body>{buttonBar}</Card.Body>
    </Card>
  );
}