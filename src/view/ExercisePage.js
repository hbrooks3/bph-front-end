// react
import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import ExerciseCard from './cards/ExerciseCard';
import SetCard from './cards/SetCard';
import LoadingUserCard from './cards/LoadingUserCard';

// react-router
import { useParams } from 'react-router-dom';

// actions
import { addSet } from '../actions/exercises';

export default function ExercisePage(props) {
  const { id } = useParams();
  const exercise = useSelector(state=>state.exercises[id]);
  const user = useSelector(state=>state.users[state.auth.uid]);
  const dispatch = useDispatch();

  if (!user || !user.loaded) {
    return <LoadingUserCard />;
  }

  return (
    <>
      <ExerciseCard id={id} editable/>

      {exercise && exercise.sets &&
        exercise.sets.map(set => <SetCard key={set} id={set} editable={user.accountType}/>)
      }

      {exercise && exercise.sets && exercise.sets.length === 0 &&
        <Card className="text-center">
          <Card.Body>
            {
              user.accountType ?
              'Click Add Set to add a set' :
              'You don\'t have any assigned sets for this exercise'
            }
          </Card.Body>
        </Card>
      }

      {user.accountType &&
        <Card border='white' onClick={()=>dispatch(addSet(id))}>
          <Button variant="outline-primary" size="lg">
            Add Set
            +
          </Button>
        </Card>
      }
    </>
  );
}