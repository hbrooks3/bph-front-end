import React, { useEffect, useState } from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import FetchingCard from './FetchingCard'

// actions
import { getSet, dissmissSetError } from '../../actions/sets'

export default function SetCard({id, editable=false}) {
  const set = useSelector(state=>state.sets[id]);
  const dispatch = useDispatch();

  const [targetReps, setTargetReps] = useState(0);
  const [actualReps, setActualReps] = useState(0);
  const [targetRPE, setTargetRPE] = useState(0);
  const [actualRPE, setActualRPE] = useState(0);

  useEffect(() =>{
    setTargetReps(set ? set.targetReps || 0 : 0);
    setActualReps(set ? set.actualReps || 0 : 0);
    setTargetRPE(set ? set.targetRPE || 0 : 0);
    setActualRPE(set ? set.actualRPE || 0 : 0);
  }, [set]);

  if (!set || !set.loaded) {
    return (
      <FetchingCard
        id={id}
        type='sets'
        fetch={()=>dispatch(getSet(id))}
        dismissError={()=>dispatch(dissmissSetError(id))}
      />
    );
  }

  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Reps</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Target</InputGroup.Text>
              </InputGroup.Prepend>

              <Form.Control
                value={targetReps}
                disabled={!editable}
                type='number'
                onChange={event => setTargetReps(event.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Actual</InputGroup.Text>
              </InputGroup.Prepend>

              <Form.Control
                value={actualReps}
                type='number'
                onChange={event => setActualReps(event.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>RPE</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Target</InputGroup.Text>
              </InputGroup.Prepend>

              <Form.Control
                value={targetRPE}
                disabled={!editable}
                type='number'
                onChange={event => setTargetRPE(event.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Actual</InputGroup.Text>
              </InputGroup.Prepend>

              <Form.Control
                value={actualRPE}
                type='number'
                onChange={event => setActualRPE(event.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}