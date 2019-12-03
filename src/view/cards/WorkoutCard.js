// react
import React, { useState } from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import FetchingCard from './FetchingCard'

// react-router
import { useHistory } from 'react-router-dom';

// actions
import { getWorkout, dissmissWorkoutError } from '../../actions/workouts'

export default function WorkoutCard({id, preview=false, editable=false}) {
  const workout = useSelector(state=>state.workouts[id]);
  const history = useHistory();
  const dispatch = useDispatch();

  if (!(workout && workout.loaded)) {
    return (
      <FetchingCard
        id={id}
        type='workouts'
        fetch={()=>dispatch(getWorkout(id))}
        dismissError={()=>dispatch(dissmissWorkoutError(id))}
      />
    );
  }

  if (preview) {
    return (
      <Card onClick={()=>history.push(`/workout/${id}`)}>
        <Card.Body>
          <Card.Title>{workout.title || 'Untitled'}</Card.Title>
          <Card.Text>Date: {workout.date || 'Not assigned'}</Card.Text>
        </Card.Body> 
      </Card>
    );
  }

  if (editable) {
    return (
      <EditableCard workout={workout}/>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{workout.title || 'Untitled'}</Card.Title>
        <Card.Text>Date: {workout.date || 'Not assigned'}</Card.Text>
      </Card.Body> 
    </Card>
  );
}

function EditableCard({workout}) {
  const [lock, setLock] = useState(true);

  const [title, setTitle] = useState(workout.title || 'Untitled');
  const [date, setDate] = useState(workout.date || 'Not assigned');

  if (lock) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Date: {date}</Card.Text>
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
              value={title}
              onChange={event=>setTitle(event.target.value)}
            />
          </Form.Row>

          <Form.Row>
            <Form.Label column as='card-text'>
              Date:
            </Form.Label>

            <Col>
              <Form.Control
                value={date}
                onChange={event=>setDate(event.target.value)}
              />
            </Col>
          </Form.Row>
        </Form>
      </Card.Body>

      <Card.Body>
        <Button onClick={()=>setLock(true)}>Cancel</Button>
      </Card.Body>
    </Card>
  );
}