// react
import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import WorkoutCard from './cards/WorkoutCard';
import ExerciseCard from './cards/ExerciseCard';
import LoadingUserCard from './cards/LoadingUserCard';

// react-router
import { useParams } from 'react-router-dom';

// actions
import { addExercise } from '../actions/workouts';

export default function WorkoutPage(props) {
  const { id } = useParams();
  const workout = useSelector(state=>state.workouts[id]);
  const user = useSelector(state=>state.users[state.auth.uid]);
  const dispatch = useDispatch();

  if (!user || !user.loaded) {
    return <LoadingUserCard />;
  }
  
  return (
    <>
      <WorkoutCard id={id} editable/>
      {workout && workout.exercises &&
        workout.exercises.map(plan => <ExerciseCard key={plan} id={plan} preview/>)
      }
      {workout && workout.exercises && workout.exercises.length === 0 &&
        <Card className="text-center">
          <Card.Body>
            {
              user.accountType ?
              'Click Add Exercise to add a Exercise' :
              'You don\'t have any assigned exercises in this workout'
            }
          </Card.Body>
        </Card>
      }
      {user.accountType &&
        <Card border='white' onClick={()=>dispatch(addExercise(id))}>
          <Button variant="outline-primary" size="lg">
            Add Exercise
            +
          </Button>
        </Card>
      }
    </>
  );
}