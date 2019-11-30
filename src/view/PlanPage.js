import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// redux
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

// views
import PlanCard from './cards/PlanCard';
import WorkoutCard from './cards/WorkoutCard';

// react-router
import { useParams } from 'react-router-dom';

// actions
import { addWorkout, dissmissPlanError, getPlan } from '../actions/plans';

export default function PlanPage(props) {
  const { id } = useParams();
  const plan = useSelector(state=>state.plans[id]);
  const user = useSelector(state=>state.users[state.auth.uid]);
  const dispatch = useDispatch();

  if (!plan) {
    return <></>
  }

  if (!plan.loaded && plan.loading) {
    return (
      <Card className="text-center">
        <Card.Body>
          <h3>Loading Plan Data</h3>
        </Card.Body>
        <Card.Body>
          <Spinner animation="border" />
        </Card.Body>
      </Card>
    );
  }

  if (!plan.loaded && plan.error) {
    return (
      <Card bg='primary' text='white' className="text-center">
        <Card.Body>
          <h3>Unable to load plan data</h3>
        </Card.Body>
        <Card.Body>
          {user.errorMessage}
        </Card.Body>
        <Card.Body>
          <Button variant="outline-light" onClick={()=>{
            dispatch(dissmissPlanError(id));
            dispatch(getPlan(id));
          }}>
            Refresh
          </Button>
        </Card.Body>
      </Card>
    );
  }

  const accountType = user && user.accountType === 1;

  const cards = (plan && plan.workouts && plan.workouts.length === 0 ?
    <NoWorkouts accountType={accountType} /> :
    plan.workouts.map(plan => <WorkoutCard key={plan} id={plan} footer/>)
  );

  return (
    <>
      <PlanCard id={id} editable={accountType}/>
      {cards}
      {accountType &&
        <Card border='white' onClick={()=>dispatch(addWorkout(id))}>
          <Button variant="outline-primary" size="lg">
            Add Workout
            +
          </Button>
        </Card>
      }
    </>
  );
}

function NoWorkouts({accountType}) {
  return (
    <Card className="text-center">
      <Card.Body>{accountType ? 'Click Create Workout to add a Workout' : 'You don\'t have any assigned workouts'}</Card.Body>
    </Card>
  )
}