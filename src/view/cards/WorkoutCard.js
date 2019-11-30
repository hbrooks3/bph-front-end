import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import FetchingCard from './FetchingCard'

// react-router
import { useHistory } from 'react-router-dom';

// actions
import { getWorkout, dissmissWorkoutError } from '../../actions/workouts'

export default function WorkoutCard({id, footer=false}) {
  const workout = useSelector(state=>state.workouts[id]);
  const history = useHistory();
  const dispatch = useDispatch();

  if (!(workout && workout.loaded)) {
    return (
      <FetchingCard
        id={id}
        type='workouts'
        fetch={()=>dispatch(getWorkout(id))}
        dismissError={()=>dispatch(dissmissWorkoutError(id))}
      />
    );
  }

  return (
    <Card onClick={footer ? ()=>history.push(`/workout/${id}`) : null}>
      <Card.Body>
        <Card.Title>{workout.title || 'Untitled'}</Card.Title>
        <Card.Text>Date: {workout.date || 'Not assigned'}</Card.Text>
      </Card.Body> 
    </Card>
  );
}