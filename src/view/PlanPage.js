// react
import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import PlanCard from './cards/PlanCard';
import WorkoutCard from './cards/WorkoutCard';
import LoadingUserCard from './cards/LoadingUserCard';

// react-router
import { useParams } from 'react-router-dom';

// actions
import { addWorkout } from '../actions/plans';

export default function PlanPage(props) {
  const { id } = useParams();
  const plan = useSelector(state=>state.plans[id]);
  const user = useSelector(state=>state.users[state.auth.uid]);
  const dispatch = useDispatch();

  if (!user || !user.loaded) {
    return <LoadingUserCard />;
  }

  return (
    <>
      <PlanCard id={id} editable={user.accountType === 1}/>

      {plan && plan.workouts &&
        plan.workouts.map(plan => <WorkoutCard key={plan} id={plan} preview/>)
      }

      {plan && plan.workouts && !plan.workouts.length &&
        <Card className="text-center">
          <Card.Body>
            {
              user.accountType ? 
              'Click Create Workout to add a workout.' :
              'You don\'t have any assigned workouts.'}
          </Card.Body>
        </Card>
      }

      {user.accountType === 1 &&
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