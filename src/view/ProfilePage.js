// react
import React, {useState} from "react";

import { useSelector, useDispatch } from 'react-redux';

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'

// views
import ErrorAlert from './ErrorAlert';

// actions
import { editUser, dissmissUserError, getUser } from '../actions/users'

export default function ProfilePage(props) {

  const user = useSelector(state=>state.users[state.auth.uid]);
  const dispatch = useDispatch();

  if (!user) {
    return <></>
  }

  if (!user.loaded && user.loading) {
    return (
      <Card className="text-center">
        <Card.Body>
          <h3>Loading User Data</h3>
        </Card.Body>
        <Card.Body>
          <Spinner animation="border" />
        </Card.Body>
      </Card>
    );
  }

  if (!user.loaded && user.error) {
    return (
      <Card bg='primary' text='white' className="text-center">
        <Card.Body>
          <h3>Unable to load user data</h3>
        </Card.Body>
        <Card.Body>
          {user.errorMessage}
        </Card.Body>
        <Card.Body>
          <Button variant="outline-light" onClick={()=>{
            dispatch(dissmissUserError(user.id));
            dispatch(getUser(user.id));
          }}>
            Refresh
          </Button>
        </Card.Body>
      </Card>
    );
  }

  if (!user.loaded) {
    return <></>
  }

  return (
    <>
      <ContactCard user={user}/>
      <GeneralCard user={user}/>
    </>
    );
}


function ContactCard({user}) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(user.email || '');
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');

  const [locked, setLock] = useState(true);

  const resetForm = () => {
    setEmail(user.email || '');
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    setLock(true);
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
    setLock(true);
  };

  const buttonBar = (
    <>
    
    {user.loading &&
      <Spinner animation="border" />
    }

    {user.error &&
      <ErrorAlert
        heading='Unable to update user'
        message={user.errorMessage}
        callback={()=>dispatch(dissmissUserError(user.id))}  
      />
    }

    {!user.loading && !user.error && locked &&
      <Button onClick={() => setLock(false)}>Edit</Button>
    }

    {!user.loading && !user.error && !locked &&
      <>
        <Button onClick={pushUpdate}>Submit</Button>
        <Button onClick={resetForm}>Cancel</Button>
      </>
    }
    </>
  );

  return (
    <Card>
      <Card.Header>Contact Information</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              readOnly={locked}
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              readOnly={locked}
              value={lastName}
              onChange={event => setLastName(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control 
              readOnly={locked}
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Form.Group> 
        </Form>
      </Card.Body>
      <Card.Body>{buttonBar}</Card.Body>
    </Card>
  );
}

function GeneralCard({user}) {
  const dispatch = useDispatch();

  const [height, setHeight] = useState(user.height || '');
  const [weight, setWeight] = useState(user.weight || '');

  const [locked, setLock] = useState(true);

  const resetForm = () => {
    setHeight(user.height || '');
    setWeight(user.weight || '');
    setLock(true);
  };

  const pushUpdate = () => {
    dispatch(
      editUser({
        ...user,
        height,
        weight,
      })
    );
  }

  const buttonBar = (
    <>
    
    {user.loading && !locked &&
      <Spinner animation="border" />
    }

    {user.error && !locked &&
      <ErrorAlert
        heading='Unable to update user'
        message={user.errorMessage}
        callback={() => {
          dispatch(dissmissUserError(user.id));
          setLock(true);
        }}  
      />
    }

    {locked &&
      <Button onClick={() => setLock(false)}>Edit</Button>
    }

    {!user.loading && !user.error && !locked &&
      <>
        <Button onClick={pushUpdate}>Submit</Button>
        <Button onClick={resetForm}>Cancel</Button>
      </>
    }
    </>
  );

  return (
    <Card>
      <Card.Header>General Information</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Weight</Form.Label>
            <Form.Control 
              readOnly={locked}
              value={weight}
              onChange={event => setWeight(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Height</Form.Label>
            <Form.Control 
              readOnly={locked}
              value={height}
              onChange={event => setHeight(event.target.value)}
            />
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Body>{buttonBar}</Card.Body>
    </Card>
  );
}