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

export default function WorkoutCard({id, footer=false}) {
  const workout = useSelector(state=>state.workouts[id]);
  const history = useHistory();

  return (
    <Card>
      <Card.Header>Workout</Card.Header>
      {(!workout || !workout.isLoaded) &&
        <FetchingCard
          id={id}
          type='workouts'
          fetch={()=>{}}
          dismissError={()=>{}}
        />
      }
      {workout && workout.isLoaded &&
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