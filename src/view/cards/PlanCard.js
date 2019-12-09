import React, { useEffect, useState } from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import FetchingCard from './FetchingCard';
import LoadingCard from './LoadingCard';

// react-router
import { useHistory } from 'react-router-dom';

// actions
import { getPlan, dismissPlanError, editPlan } from '../../actions/plans';
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
        dismissError={()=>dispatch(dismissPlanError(id))}
      />
    );
  }

  if (plan.loading) {
    return (
      <LoadingCard />
    );
  }

  const coach = <Name uid={plan.coachId} />;
  const trainee = <Name uid={plan.traineeId} />;

  if (preview) {
    return (
      <Card onClick={()=>history.push(`/plan/${id}`)}>
        <Card.Body>
          <Card.Title>Plan</Card.Title>
          <Card.Text>Coach: {coach}</Card.Text>
          <Card.Text>Trainee: {trainee}</Card.Text>
          <Card.Text>Status: {<Status statusCode={plan.status}/>}</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  if (editable) {
    return (
      <EditablePlanCard plan={plan}/>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Plan</Card.Title>
        <Card.Text>Coach: {coach}</Card.Text>
        <Card.Text>Trainee: {trainee}</Card.Text>
        <Card.Text>Status: {<Status statusCode={plan.status}/>}</Card.Text>
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
    } else if (!user || !(user.loading || user.error)) {
      dispatch(getUser(uid));
    }
  }, [uid, user, dispatch]);

  return name;
}

function Status({statusCode}) {
  if (statusCode === 0) {
    return 'Draft';
  }

  if (statusCode === 1) {
    return 'Published';
  }

  if (statusCode === 2) {
    return 'In-progress';
  }

  if (statusCode === 3) {
    return 'Completed';
  }

  return 'Unknown Status';
}

function EditablePlanCard({plan}) {
  const [lock, setLock] = useState(true);
  const coach = useSelector(state => state.users[plan.coachId]);
  const dispatch = useDispatch();

  const setTrainee = (id) => {
    dispatch(
      editPlan({
        ...plan,
        traineeId: id,
      })
    );
  }

  const setStatus = (statusCode) => {
    dispatch(
      editPlan({
        ...plan,
        status: statusCode,
      })
    );
  }

  if (lock) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Plan</Card.Title>
          <Card.Text>Coach: {<Name uid={plan.coachId} />}</Card.Text>
          <Card.Text>Trainee: {<Name uid={plan.traineeId} />}</Card.Text>
          <Card.Text>Status: {<Status statusCode={plan.status}/>}</Card.Text>
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
        <Card.Text>Coach: {<Name uid={plan.coachId} />}</Card.Text>
        <Form inline className='mb-2'>
          <Form.Row>
            <Col>
              <Form.Label as='card-text'>Trainee: </Form.Label>
            </Col>

            <Col>
              <Dropdown onSelect={setTrainee}>
                <Dropdown.Toggle variant='outline-dark'>
                  <Name uid={plan.traineeId} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {
                    coach.trainees.map(id => 
                      <Dropdown.Item eventKey={id} key={id}>
                        <Name uid={id} />
                      </Dropdown.Item>
                    )
                  }
                  <Dropdown.Item eventKey={null} key='reset'>Unassign</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Form.Row>
        </Form>
        <Form inline>
          <Form.Row>
            <Col>
              <Form.Label as='card-text'>Status: </Form.Label>
            </Col>

            <Col>
              <Dropdown onSelect={setStatus}>
                <Dropdown.Toggle variant='outline-dark'>
                  <Status statusCode={plan.status}/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {
                    [0,1].map(statusCode => 
                      <Dropdown.Item eventKey={statusCode} key={statusCode}>
                        <Status statusCode={statusCode}/>
                      </Dropdown.Item>
                    )
                  }
                </Dropdown.Menu>
              </Dropdown>
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