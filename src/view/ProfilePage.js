// React imports
import React, {useState} from "react";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';


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
  const VALUE = 0;
  const UPDATE_FUNCTION = 1;
  const INITIAL_VALUE = 2;

  const height = [...useState(props.user.Height), props.user.Height];
  const weight = [...useState(props.user.Weight), props.user.Weight];
  const email = [...useState(props.user.Email), props.user.Email];
  const firstName = [...useState(props.user.FirstName), props.user.FirstName];
  const lastName = [...useState(props.user.LastName), props.user.LastName];

  const user = {
    Height: height[VALUE],
    Weight: weight[VALUE],
    Email: email[VALUE],
    FirstName: firstName[VALUE],
    LastName: lastName[VALUE],
  };

  const pushUpdate = (event) => {
    event.preventDefault();
    updateUser(Object.assign(props.user,user));
  };

  const pageData = [
    {
      title: `General Information`,
      body: [
        {label: `Height`, value: height[VALUE], update: height[UPDATE_FUNCTION], reset: height[INITIAL_VALUE]},
        {label: `Weight`, value: weight[VALUE], update: weight[UPDATE_FUNCTION], reset: weight[INITIAL_VALUE]},
      ]
    },
    {
      title: `Contact Information`,
      body: [
        {label: `First Name`, value: firstName[VALUE], update: firstName[UPDATE_FUNCTION], reset: firstName[INITIAL_VALUE]},
        {label: `Last Name`, value: lastName[VALUE], update: lastName[UPDATE_FUNCTION], reset: lastName[INITIAL_VALUE]},
        {label: `Email`, value: weight[VALUE], update: weight[UPDATE_FUNCTION], reset: weight[INITIAL_VALUE]},
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
    setLock(true);
    card.body.forEach((field) => field.update(field.reset));
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
