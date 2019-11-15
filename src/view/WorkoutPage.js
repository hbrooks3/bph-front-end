// react
import React from "react";

// react-bootstrap

// redux
import { useSelector } from 'react-redux';

// views
import WorkoutCard from './cards/WorkoutCard';
import ExerciseCard from './cards/ExerciseCard';

// react-router
import { useParams } from 'react-router-dom';

export default function WorkoutPage(props) {
  const { id } = useParams();
  const workout = useSelector(state=>state.workouts[id]);

  const cards = (workout && workout.exercises &&
    workout.exercises.map(plan => <ExerciseCard key={plan} id={plan} footer/>)
  );
  return (
    <>
      <WorkoutCard id={id}/>
      {cards}
    </>
  );
}