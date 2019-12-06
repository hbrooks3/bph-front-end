// react
import React, { useState, useEffect } from "react";

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import InputGroup from 'react-bootstrap/InputGroup';

// redux
import { useSelector, useDispatch } from 'react-redux';

// actions
import { getComment, editComment } from '../actions/comments';
import { getUser } from '../actions/users';

export default function CommentGroup ({comments, ownerId, add, remove}) {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const submit = event => {
    event.preventDefault();
    dispatch(
      add(ownerId, comment)
    );
    setComment('');
  }

  return (
    <ListGroup variant="flush">
      {
        comments.map(id => (
          <Comment commentId={id} key={id} remove={remove(ownerId)}/>
        ))
      }
      <ListGroup.Item as='div' key='adder'>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Add Comment"
            value={comment}
            onChange={event=>setComment(event.target.value)}
          />
          <InputGroup.Append>
            <Button onClick={submit} variant="outline-primary">Post</Button>
          </InputGroup.Append>
        </InputGroup>
      </ListGroup.Item>
    </ListGroup>
  );
}

function Comment({commentId, remove}) {
  const comment = useSelector(state => state.comments[commentId]);
  const currUid = useSelector(state => state.auth.uid);

  const [text, setText] = useState('Loading...');
  const [lock, setLock] = useState(true);
  const dispatch = useDispatch();

  const deleteComment = () => {
    dispatch(
      remove(commentId)
    );
  }

  const updateComment = () => {
    dispatch(
      editComment({
        ...comment,
        description: text,
      })
    );
    setLock(true);
  }

  useEffect(() => {
    if (comment && comment.loaded) {
      setText(comment.description);
    } else if (!comment || !(comment.loading || comment.error || comment.loaded)) {
      dispatch(getComment(commentId));
    }
  }, [comment, commentId, dispatch]);

  if (!comment) {
    return null;
  }

  if (!lock) {
    return (
      <ListGroup.Item as='div'>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Add Comment"
            value={text}
            onChange={event=>setText(event.target.value)}
          />
          <InputGroup.Append>
            <SplitButton
              variant='outline-secondary'
              size='sm' drop='left' title='Repost'
              onClick={updateComment}
            >
              <Dropdown.Item onClick={()=>setLock(true)}>Cancel</Dropdown.Item>
            </SplitButton>
          </InputGroup.Append>
        </InputGroup>
      </ListGroup.Item>
    );
  }

  if (currUid === comment.createdById) {
    return (
      <ListGroup.Item as='div' className='d-flex'>
        <div className='flex-fill'>
          {text}
          <br/>
          <small className="text-muted">
            Posted by you.
          </small>
        </div>
        <DropdownButton variant='outline-secondary' size='sm' drop='left' title=''>
          <Dropdown.Item onClick={()=>setLock(false)}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={deleteComment}>Delete</Dropdown.Item>
        </DropdownButton>
      </ListGroup.Item>
    );
  }

  return (
    <ListGroup.Item as='div'>
      {text}
      <br/>
      <small className="text-muted">
        Posted by {<Name uid={comment.createdById}/>}
      </small>
    </ListGroup.Item>
  );
}

function Name({uid}) {
  const user = useSelector(state => state.users[uid]);
  const [name, setName] = useState('Loading...');
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.loaded) {
      setName(`${user.firstName} ${user.lastName}`);
    } else if (!user || !(user.loading || user.error || user.loaded)) {
      dispatch(getUser(uid));
    }
  }, [uid, user, dispatch]);

  return name;
}