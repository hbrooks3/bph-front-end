// react
import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card'

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import WorkoutCard from './cards/WorkoutCard';
import ExerciseCard from './cards/ExerciseCard';

// react-router
import { useParams } from 'react-router-dom';

// actions
import { addExercise } from '../actions/workouts';

export default function WorkoutPage(props) {
  const { id } = useParams();
  const workout = useSelector(state=>state.workouts[id]);
  const dispatch = useDispatch();

  const cards = (workout && workout.exercises &&
    workout.exercises.map(plan => <ExerciseCard key={plan} id={plan} footer/>)
  );
  
  return (
    <>
      <WorkoutCard id={id}/>
      {cards}
      <Card className="text-center" onClick={()=>dispatch(addExercise(id))}>
        <Card.Body>
          <h1>Add Exercise</h1>
        </Card.Body>
      </Card>
    </>
  );
}