import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// redux
import { useSelector } from 'react-redux';

// views
import FetchingCard from './FetchingCard'

// react-router
import { useHistory } from 'react-router-dom';

export default function ExerciseCard({id, footer=false}) {
  const exercise = useSelector(state=>state.exercises[id]);
  const history = useHistory();

  return (
    <Card>
      <Card.Header>Exercise</Card.Header>
      {(!exercise || !exercise.isLoaded) &&
        <FetchingCard
          id={id}
          type='exercises'
          fetch={()=>{}}
          dismissError={()=>{}}
        />
      }
      {exercise && exercise.isLoaded &&
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