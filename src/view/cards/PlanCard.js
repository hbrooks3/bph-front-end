import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import FetchingCard from './FetchingCard'

// react-router
import { useHistory } from 'react-router-dom';

// actions
import { getPlan, dissmissPlanError } from '../../actions/plans';

export default function PlanCard({id, footer=false, editable=false}) {
  const plan = useSelector(state=>state.plans[id]);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Card onClick={footer ? ()=>history.push(`/plan/${id}`) : null}>

      {(!plan || !plan.loaded) &&
        <FetchingCard
          id={id}
          type='plans'
          fetch={()=>dispatch(getPlan(id))}
          dismissError={()=>dispatch(dissmissPlanError(id))}
        />
      }
      {plan && plan.loaded &&
        <>
        <CardBody plan={plan}/>
        </>
      }      
    </Card>
  );
}

const getName = uid => state => state.users[uid] ? `${state.users[uid].firstName} ` : 'Not Assigned'

// function Name({uid}) {
//   if (!uid) {

//   }

//   return '';
// }

function CardBody({plan}) {
  const coach = useSelector(getName(plan.coachId));
  const trainee = useSelector(getName(plan.traineeId));

  return (
    <Card.Body>
      <Card.Title>Plan</Card.Title>
      <Card.Text>Coach: {coach}</Card.Text>
      <Card.Text>Trainee: {trainee}</Card.Text>
    </Card.Body>
  );
}