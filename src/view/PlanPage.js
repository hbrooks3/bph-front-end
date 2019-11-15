import React from "react";

// react-bootstrap

// redux
import { useSelector } from 'react-redux';

// views
import PlanCard from './cards/PlanCard';
import WorkoutCard from './cards/WorkoutCard';

// react-router
import { useParams } from 'react-router-dom';

export default function PlanPage(props) {
  const { id } = useParams();
  const plan = useSelector(state=>state.plans[id]);

  const cards = (plan && plan.workouts &&
    plan.workouts.map(plan => <WorkoutCard key={plan} id={plan} footer/>)
  );

  return (
    <>
      <PlanCard id={id}/>
      {cards}
    </>
  );
}