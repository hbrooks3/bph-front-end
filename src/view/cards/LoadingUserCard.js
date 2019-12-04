// react
import React from "react";

// react-bootstrap
import Card from "react-bootstrap/Card";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

// redux
import { useSelector, useDispatch } from 'react-redux';

// actions
import { dismissUserError, getUser } from '../../actions/users'

export default function LoadingUserCard() {
  const user = useSelector(state=>state.users[state.auth.uid]);
  const dispatch = useDispatch();

  if (!user) {
    return null;
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
            dispatch(dismissUserError(user.id));
            dispatch(getUser(user.id));
          }}>
            Refresh
          </Button>
        </Card.Body>
      </Card>
    );
  }

  if (!user.loaded) {
    return null;
  }
}