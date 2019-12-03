// react
import React, { useState } from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import FetchingCard from './FetchingCard'

// react-router
import { useHistory } from 'react-router-dom';

// actions
import { getExercise, dissmissExerciseError } from '../../actions/exercises'

export default function ExerciseCard({id, preview=false, editable=false}) {
  const exercise = useSelector(state=>state.exercises[id]);
  const history = useHistory();
  const dispatch = useDispatch();

  if (!(exercise && exercise.loaded)) {
    return (
      <FetchingCard
        id={id}
        type='exercises'
        fetch={()=>dispatch(getExercise(id))}
        dismissError={()=>dispatch(dissmissExerciseError(id))}
      />
    );
  }

  if (preview) {
    return (
      <Card onClick={()=>history.push(`/exercise/${id}`)}>
        <Card.Body>
          <Card.Title>{exercise.name || 'Unnamed'}</Card.Title>
          <Card.Text>Number of Sets: {exercise.sets.length}</Card.Text>
        </Card.Body> 
      </Card>
    );
  }

  if (editable) {
    return (
      <EditableCard exercise={exercise}/>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{exercise.name || 'Unnamed'}</Card.Title>
        <Card.Text>Number of Sets: {exercise.sets.length}</Card.Text>
      </Card.Body> 
    </Card>
  );
}

function EditableCard({exercise}) {
  const [lock, setLock] = useState(true);

  const [name, setName] = useState(exercise.name || 'Unnamed');

  if (lock) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Number of Sets: {exercise.sets.length}</Card.Text>
        </Card.Body>  
        <Card.Body>
          <Button onClick={()=>setLock(false)}>Edit</Button>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Row>
            <Form.Control
              className='card-title'
              value={name}
              onChange={event=>setName(event.target.value)}
            />
          </Form.Row>
        </Form>

        <Card.Text>
          Number of Sets: {exercise.sets.length}
        </Card.Text>
      </Card.Body>

      <Card.Body>
        <Button onClick={()=>setLock(true)}>Cancel</Button>
      </Card.Body>
    </Card>
  );
}