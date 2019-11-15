// react
import React from "react";

// react-bootstrap

// redux
import { useSelector } from 'react-redux';

// views
import ExerciseCard from './cards/ExerciseCard';
import SetCard from './cards/SetCard';

// react-router
import { useParams } from 'react-router-dom';

export default function ExercisePage(props) {
  const { id } = useParams();
  const exercise = useSelector(state=>state.exercises[id]);

  const cards = (exercise && exercise.exercises &&
    exercise.sets.map(set => <SetCard key={set} id={set} footer/>)
  );
  return (
    <>
      <ExerciseCard id={id}/>
      {cards}
    </>
  );
}