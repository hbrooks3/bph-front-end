// React imports
import React, {useState} from "react";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';

// Presenter imports
import { useUser, updateUser } from "../dummy-presenter/User";
// import { useUser, updateUser } from "../presenter/User";

export default function ProfilePage(props) {
  const { user, isLoading } = useUser();

  return (
    <>
      {isLoading && (
        <Spinner animation="grow">
          <span className="sr-only">Loading...</span>
        </Spinner>)}
      {!isLoading && user && (
        <PageBody user={user}/>
      )}
    </>
  );
}

function PageBody(props) {
  const initialUser = props.user;

  const [user, editUser] = useState(initialUser);

  const pushUpdate = (event) => {
    event.preventDefault();
    updateUser(user);
  };

  // Updates contians update functions for each 
  const controls = Object.keys(user).reduce((accumulator, key) => {
    accumulator.update[key] = (value) => {
      let newUser = {...user};
      newUser[key] = value;
      editUser(newUser);
    };
    accumulator.reset[key] = () => {
      editUser(initialUser);
    };
    return accumulator;
  }, {update: {}, reset: {}});

  const pageData = [
    {
      title: `General Information`,
      body: [
        {label: `Height`, value: user.height, update: controls.update.height, reset: controls.reset.height},
        {label: `Weight`, value: user.weight, update: controls.update.weight, reset: controls.reset.weight},
      ]
    },
    {
      title: `Contact Information`,
      body: [
        {label: `First Name`, value: user.firstName, update: controls.update.firstName, reset: controls.reset.firstName},
        {label: `Last Name`, value: user.lastName, update: controls.update.lastName, reset: controls.reset.lastName},
        {label: `Email`, value: user.email, update: controls.update.email, reset: controls.reset.email},
      ]
    },
  ];

  const pageDisplay = pageData.map((card, index) =>
    <DisplayCard card={card} key={index} onSubmit={pushUpdate}/>
  );

  return (<CardColumns>{pageDisplay}</CardColumns>);
}

function DisplayCard(props) {
  const card = props.card;

  const [lock, setLock] = useState(true);

  const editForm = () => {
    setLock(false);
  }

  const submitForm = (event) => {
    setLock(true);
    props.onSubmit(event);
  }

  const cancelEdit = () => {
    card.body.forEach(field => field.reset());
    setLock(true);
  }

  return (
    <Card className="text-center">
      <Card.Header>{card.title}</Card.Header>
      <Card.Body>
        <Form inline={true} onSubmit={props.onSubmit}>
          {
            card.body.map((field, index) => 
              <Form.Group key={index}>
                <Form.Label column sm={1}>{field.label}</Form.Label>
                <Col sm={1}>
                  <Form.Control
                    readOnly={lock}
                    value={field.value}
                    onChange={event => field.update(event.target.value)}
                  />
                </Col>
              </Form.Group>
            )
          }
        </Form>
      </Card.Body>
      <Card.Body>
        <ButtonToolbar>
          {lock &&
            <Button variant="secondary" onClick={editForm}>Edit</Button>
          }
          {!lock && 
            <>
            <Button variant="secondary" onClick={submitForm}>Submit</Button>
            <Button onClick={cancelEdit}>Cancel</Button>
            </>
          }
        </ButtonToolbar>
      </Card.Body>
    </Card>
  );
}
