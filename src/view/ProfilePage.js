// react
import React, {useState} from "react";

import { useSelector, useDispatch } from 'react-redux';

// react-bootstrap
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// views

// actions
import { editUser } from '../actions/users'

export default function ProfilePage(props) {

  const initialUser = useSelector(state=>state.users[state.auth.uid]);

  return (
    <div>
      <CardColumns>
        <ContactCard uid={initialUser.id}/>
        <GeneralCard uid={initialUser.id}/>
      </CardColumns>
    </div>
    );
}


function ContactCard({uid}) {

  const user = useSelector(state=>state.users[uid]);
  const dispatch = useDispatch();

  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const resetForm = () => {
    setEmail(user.email);
    setFirstName(user.firstName);
    setLastName(user.lastName);
  
  };

  const pushUpdate = () => {
    dispatch(
      editUser({
        ...user,
        email,
        firstName,
        lastName,
      })
    );
  };

  const contactInfoCard = {
    title: `Contact Information`,
    fields: [
      {label: `First Name`, value: firstName || "", update: setFirstName},
      {label: `Last Name`, value: lastName || '', update: setLastName},
      {label: `Email`, value: email || '', update: setEmail},
    ],
    submit: pushUpdate,
    reset: resetForm,
  };

  return(
    <EditableCard {...contactInfoCard} />
  );
}

function GeneralCard({uid}) {
  const user = useSelector(state=>state.users[uid]);
  const dispatch = useDispatch();

  const [height, setHeight] = useState(user.height);
  const [weight, setWeight] = useState(user.weight);

  const resetForm = () => {
    setHeight(user.height);
    setWeight(user.weight);
  };

  const pushUpdate = () => dispatch(
    editUser({
      ...user,
      height,
      weight,
    })
  );

  const generalInfoCard = {
    title: `General Information`,
    fields: [
      {label: `height`, value: height || '', update: (value) => setHeight(value)},
      {label: `weight`, value: weight  || '', update: setWeight},
    ],
    submit: pushUpdate,
    reset: resetForm,
  };

  return(
    <EditableCard {...generalInfoCard} />
  );
}

function EditableCard(props) {
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

function onError(message) {
  console.log(message ? message : 'Error');
}