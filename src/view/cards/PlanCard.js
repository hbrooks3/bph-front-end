import React, { useEffect, useState } from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import FetchingCard from './FetchingCard';

// react-router
import { useHistory } from 'react-router-dom';

// actions
import { getPlan, dissmissPlanError } from '../../actions/plans';
import { getUser } from '../../actions/users';

export default function PlanCard({id, preview=false, editable=false}) {
  const plan = useSelector(state=>state.plans[id]);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!(plan && plan.loaded)) {
    return (
      <FetchingCard
        id={id}
        type='plans'
        fetch={()=>dispatch(getPlan(id))}
        dismissError={()=>dispatch(dissmissPlanError(id))}
      />
    );
  }

  const coach = Name({uid: plan.coachId});
  const trainee = Name({uid: plan.traineeId});

  if (preview) {
    return (
      <Card onClick={()=>history.push(`/plan/${id}`)}>
        <Card.Body>
          <Card.Title>Plan</Card.Title>
          <Card.Text>Coach: {coach}</Card.Text>
          <Card.Text>Trainee: {trainee}</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  if (editable) {
    return (
      <EditablePlanCard coach={coach} trainee={trainee}/>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Plan</Card.Title>
        <Card.Text>Coach: {coach}</Card.Text>
        <Card.Text>Trainee: {trainee}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function Name({uid}) {
  const user = useSelector(state => state.users[uid]);
  const [name, setName] = useState('Loading...');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!uid) {
      setName('Not Assigned');
    } else if (user && user.loaded) {
      setName(`${user.firstName} ${user.lastName}`);
    } else if (!user || !user.loading) {
      dispatch(getUser(uid));
    }
  }, [uid, user, dispatch]);

  return name;
}

function EditablePlanCard({coach, trainee}) {
  const [lock, setLock] = useState(true);

  if (lock) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Plan</Card.Title>
          <Card.Text>Coach: {coach}</Card.Text>
          <Card.Text>Trainee: {trainee}</Card.Text>
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
        <Card.Title>Plan</Card.Title>
        <Card.Text>Coach: {coach}</Card.Text>
        <Form inline>
          <Form.Row>
            <Col>
              <Form.Label as='card-text'>Trainee: </Form.Label>
            </Col>

            <Col>
              <Form.Control as='select'>
                <option>{trainee}</option>
                <option>Other trainee</option>
                <option>This needs to be done</option>
              </Form.Control>
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