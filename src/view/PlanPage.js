import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card'

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import PlanCard from './cards/PlanCard';
import WorkoutCard from './cards/WorkoutCard';

// react-router
import { useParams } from 'react-router-dom';

// actions
import { addWorkout } from '../actions/plans';

export default function PlanPage(props) {
  const { id } = useParams();
  const plan = useSelector(state=>state.plans[id]);
  const dispatch = useDispatch();

  const cards = (plan && plan.workouts &&
    plan.workouts.map(plan => <WorkoutCard key={plan} id={plan} footer/>)
  );

  return (
    <>
      <PlanCard id={id}/>
      {cards}
      <Card className="text-center" onClick={()=>dispatch(addWorkout(id))}>
        <Card.Body>
          <h1>Add Workout</h1>
        </Card.Body>
      </Card>
    </>
  );
}