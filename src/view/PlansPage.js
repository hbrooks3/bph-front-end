import React from "react";

// react-bootstrap
import Card from "react-bootstrap/Card";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import PlanCard from './cards/PlanCard';

// actions
import { addPlan, dismissUserError, getUser } from '../actions/users'

export default function PlansPage(props) {
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
    return <></>
  }

  const cards = (user && user.plans &&
    user.plans.map(plan => <PlanCard key={plan} id={plan} footer />)
  );

  return (
    <>
      <Card border='white' className="text-center" onClick={()=>dispatch(addPlan(user.id))}>
        <Button variant="outline-primary" size="lg">
          Create Plan
          +
        </Button>
      </Card>
      {cards}
    </>
  );
}