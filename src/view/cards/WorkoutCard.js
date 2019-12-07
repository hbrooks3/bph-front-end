// react
import React, { useState } from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

// moment
import * as moment from 'moment';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import FetchingCard from './FetchingCard';
import LoadingCard from './LoadingCard';
import CommentGroup from '../CommentGroup';

// react-router
import { useHistory } from 'react-router-dom';

// actions
import {
  getWorkout, dismissWorkoutError, editWorkout, addComment, deleteComment
} from '../../actions/workouts';

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
        dismissError={()=>dispatch(dismissWorkoutError(id))}
      />
    );
  }

  if (workout.loading) {
    return (
      <LoadingCard />
    );
  }

  if (preview) {
    return (
      <Card onClick={()=>history.push(`/workout/${id}`)}>
        <Card.Body>
          <Card.Title>{workout.title || 'Untitled'}</Card.Title>
          <Card.Text>Date: {moment(workout.date).format('dddd, MMMM Do YYYY')}</Card.Text>
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
        <Card.Text>Date: {moment(workout.date).format('dddd, MMMM Do YYYY')}</Card.Text>
      </Card.Body>
      <CommentGroup
        comments={workout.comments}
        ownerId={workout.id}
        add={addComment}
        remove={deleteComment}
      />
    </Card>
  );
}

function EditableCard({workout}) {
  const [lock, setLock] = useState(true);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(workout.title || 'Untitled');
  // const [date, setDate] = useState(workout.date || 'Not assigned');
  const [date, setDate] = useState(moment(workout.date).format('YYYY-MM-DD') || 'Not assigned');

  const submit = () => {
    dispatch(
      editWorkout({
        ...workout,
        title: title,
        date: date,
      })
    );
  }

  if (lock) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Date: {moment(workout.date).format('dddd, MMMM Do YYYY')}</Card.Text>
        </Card.Body> 
        <Card.Body>
          <Button onClick={()=>setLock(false)}>Edit</Button>
        </Card.Body>
        <CommentGroup
          comments={workout.comments}
          ownerId={workout.id}
          add={addComment}
          remove={deleteComment}
        />
      </Card>
    )
  }

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={submit}>
          <Form.Row>
            <Form.Control
              className='card-title'
              size="lg"
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
                type='date'
                onChange={event=>setDate(event.target.value)}
              />
            </Col>
          </Form.Row>
        </Form>
      </Card.Body>

      <Card.Body>
        <Button onClick={()=>setLock(true)} className='mr-2'>Cancel</Button>
        <Button onClick={submit}>Submit</Button>
      </Card.Body>

      <CommentGroup
        comments={workout.comments}
        ownerId={workout.id}
        add={addComment}
        remove={deleteComment}
      />
    </Card>
  );
}