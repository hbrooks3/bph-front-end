// react
import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
// // import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';

// react-router
import { useParams } from "react-router-dom";

// redux
import { useDispatch, useSelector } from 'react-redux';

// actions
import { fetchWorkout, dismissWorkoutFetchError } from '../actions/workouts'

// views
import LoadingCard from './LoadingCard';
import FetchingCard from './FetchingCard';


export default function WorkoutPage(props) {
  const { id } = useParams();

  const workout =  useSelector(state=>state.workouts[id]);
  const exercises = useSelector(state=>state.exercises);

  const exerciseCards = (workout && workout.isLoaded) ?
    workout.exercises.map(id => <ExerciseCard key={id} id={id}/>) :
    <LoadingCard />

  return (
    <CardColumns>
      <WorkoutInfoCard id={id}/>
      {exerciseCards}
    </CardColumns>
  );
}

function WorkoutInfoCard({id}) {
  const workout = useSelector(state => state.workouts[id]);
  const dispatch = useDispatch();

  if (workout && workout.isLoaded) {
    return <Card>Workout Loaded</Card>
  }

  return (
    <FetchingCard
      type='workouts'
      id={id}
      fetch={() => dispatch( fetchWorkout(id) )}
      dismissError={() => dispatch( dismissWorkoutFetchError(id) )}
    />
  )
}

function ExerciseCard({id}) {
  const exercise = useSelector(state => state.exercises[id]);
  const dispatch = useDispatch();

  if (exercise && exercise.isLoaded) {
    return <Card>Workout Loaded</Card>
  }

  return (
    <FetchingCard
      type='workout'
      id={id}
      fetch={() => dispatch( fetchWorkout(id) )}
      dismissError={() => dispatch( dismissWorkoutFetchError(id) )}
    />
  )
}