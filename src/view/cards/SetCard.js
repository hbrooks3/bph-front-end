import React, { useEffect, useState } from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import FetchingCard from './FetchingCard';
import LoadingCard from './LoadingCard';

// actions
import { getSet, dismissSetError, editSet } from '../../actions/sets';

export default function SetCard({id, editable=false}) {
  const set = useSelector(state=>state.sets[id]);
  const dispatch = useDispatch();

  const [targetReps, setTargetReps] = useState(0);
  const [actualReps, setActualReps] = useState(0);
  const [targetRPE, setTargetRPE] = useState(0);
  const [actualRPE, setActualRPE] = useState(0);
  const [targetWeight, setTargetWeight] = useState(0);
  const [actualWeight, setActualWeight] = useState(0);

  const [diff, setDiff] = useState(false);

  useEffect(() =>{
    setTargetReps(set ? set.targetReps || 0 : 0);
    setActualReps(set ? set.actualReps || 0 : 0);
    setTargetRPE(set ? set.targetRPE || 0 : 0);
    setActualRPE(set ? set.actualRPE || 0 : 0);
    setTargetWeight(set ? set.targetWeight || 0 : 0);
    setActualWeight(set ? set.actualWeight || 0 : 0);
  }, [set]);

  const update = (updater, value) => {
    setDiff(true);
    updater(value);
  }

  const submit = () => {
    dispatch(
      editSet({
        ...set,
        targetReps,
        actualReps,
        targetRPE,
        actualRPE,
        targetWeight,
        actualWeight,
      })
    );
    setDiff(false);
  }

  if (!set || !set.loaded) {
    return (
      <FetchingCard
        id={id}
        type='sets'
        fetch={()=>dispatch(getSet(id))}
        dismissError={()=>dispatch(dismissSetError(id))}
      />
    );
  }

  if (set.loading) {
    return (
      <LoadingCard />
    );
  }

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={submit}>
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
                onChange={event => update(setTargetReps, event.target.value)}
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
                onChange={event => update(setActualReps, event.target.value)}
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
                onChange={event => update(setTargetRPE, event.target.value)}
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
                onChange={event => update(setActualRPE, event.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>Weight</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Target</InputGroup.Text>
              </InputGroup.Prepend>

              <Form.Control
                value={targetWeight}
                disabled={!editable}
                type='number'
                onChange={event => update(setTargetWeight, event.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Actual</InputGroup.Text>
              </InputGroup.Prepend>

              <Form.Control
                value={actualWeight}
                type='number'
                onChange={event => update(setActualWeight, event.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Card.Body>
      {diff &&
        <Card.Body>
          <Button onClick={submit}>Update</Button>
        </Card.Body>
      }
    </Card>
  );
}