import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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

  return (
    <Card>
      <Card.Header>Workout</Card.Header>
      {(!workout || !workout.loaded) &&
        <FetchingCard
          id={id}
          type='workouts'
          fetch={()=>dispatch(getWorkout(id))}
          dismissError={()=>dispatch(dissmissWorkoutError(id))}
        />
      }
      {workout && workout.loaded &&
        <>
        <Card.Body>
          Workout Loaded
        </Card.Body>
        
        {footer &&
          <Card.Footer>
            <Button onClick={()=>history.push(`/workout/${id}`)}>
              View Workout
            </Button>
          </Card.Footer>
        }
        </>
      }      
    </Card>
  );
}