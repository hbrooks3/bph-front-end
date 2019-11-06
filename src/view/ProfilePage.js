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

  // const reduceUser = (state, action) => {
  //   switch (action.key) {
  //     case 'height':
  //       return {...state, height: action.value};
  //     default:
  //       throw new Error();
  //   }
  // }

  // const [user, editUser] = useReducer(reduceUser, initialUser);
  const [user, editUser] = useState(initialUser);


  // const VALUE = 0;
  // const UPDATE_FUNCTION = 1;
  // const INITIAL_VALUE = 2;

  const pushUpdate = (event) => {
    event.preventDefault();
    updateUser(user);
  };

  // console.log(Object.keys(user));

  

  const update = Object.keys(user).reduce((accumulator, key) => {
    accumulator[key] = (value) => {
      let newUser = {...user};
      newUser[key] = value;
      editUser(newUser);
    };
    return accumulator;
  }, {});

  console.log(update);

  const pageData = [
    {
      title: `General Information`,
      body: [
        // {label: `Height`, value: user.height, update: (value) => editUser({...user, height: value}), reset: initialUser.height},
        {label: `Height`, value: user.height, update: update.height, reset: initialUser.height},
        // {label: `Weight`, value: weight[VALUE], update: weight[UPDATE_FUNCTION], reset: weight[INITIAL_VALUE]},
      ]
    },
    {
      title: `Contact Information`,
      body: [
        // {label: `First Name`, value: firstName[VALUE], update: firstName[UPDATE_FUNCTION], reset: firstName[INITIAL_VALUE]},
        // {label: `Last Name`, value: lastName[VALUE], update: lastName[UPDATE_FUNCTION], reset: lastName[INITIAL_VALUE]},
        // {label: `Email`, value: weight[VALUE], update: weight[UPDATE_FUNCTION], reset: weight[INITIAL_VALUE]},
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
