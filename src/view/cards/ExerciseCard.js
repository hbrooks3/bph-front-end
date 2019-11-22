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
import { getExercise, dissmissExerciseError } from '../../actions/exercises'

export default function ExerciseCard({id, footer=false}) {
  const exercise = useSelector(state=>state.exercises[id]);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Card>
      <Card.Header>Exercise</Card.Header>
      {(!exercise || !exercise.loaded) &&
        <FetchingCard
          id={id}
          type='exercises'
          fetch={()=>dispatch(getExercise(id))}
          dismissError={()=>dispatch(dissmissExerciseError(id))}
        />
      }
      {exercise && exercise.loaded &&
        <>
        <Card.Body>
          Exercise Loaded
        </Card.Body>
        
        {footer &&
          <Card.Footer>
            <Button onClick={()=>history.push(`/exercise/${id}`)}>
              View Exercise
            </Button>
          </Card.Footer>
        }
        </>
      }      
    </Card>
  );
}