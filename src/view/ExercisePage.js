// react
import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card'

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import ExerciseCard from './cards/ExerciseCard';
import SetCard from './cards/SetCard';

// react-router
import { useParams } from 'react-router-dom';

// actions
import { addSet } from '../actions/exercises';

export default function ExercisePage(props) {
  const { id } = useParams();
  const exercise = useSelector(state=>state.exercises[id]);
  const dispatch = useDispatch();

  const cards = (exercise && exercise.sets &&
    exercise.sets.map(set => <SetCard key={set} id={set}/>)
  );

  return (
    <>
      <ExerciseCard id={id} editable/>
      {cards}
      <Card className="text-center" onClick={()=>dispatch(addSet(id))}>
        <Card.Body>
          <h1>Add Set</h1>
        </Card.Body>
      </Card>
    </>
  );
}