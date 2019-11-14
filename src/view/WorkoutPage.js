// react
import React, {useEffect} from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import CardColumns from 'react-bootstrap/CardColumns';

// react-router
import { useParams } from "react-router-dom";

// redux
import { useDispatch, useSelector } from 'react-redux';

// actions
import { fetchWorkout } from '../actions/workouts'

// views
import LoadingCard from './LoadingCard'


export default function WorkoutPage(props) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const workout = useSelector(state => state.workouts[id]);

  useEffect(() => {
    if (workout == null) {
      console.log('fetching', id);
      dispatch( fetchWorkout(id) );
    }
  }, [dispatch, workout, id]);

  if (!workout) {
    return <LoadingCard />;
  }

  return (
    <Card>
      <Card.Header>Workout Page</Card.Header>
      <Card.Body>{workout && !workout.isFetching ? workout.test: 'Loading...'}</Card.Body>
    </Card>
  );
}
