import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import FetchingCard from './FetchingCard'

// react-router
import { useHistory } from 'react-router-dom';

// actions
import { getPlan, dissmissPlanError } from '../../actions/plans'

export default function PlanCard({id, footer=false, editable=false}) {
  const plan = useSelector(state=>state.plans[id]);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Card>
      <Card.Header>Plan</Card.Header>
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
        
        {footer &&
          <Card.Footer>
            <Button onClick={()=>history.push(`/plan/${id}`)}>
              View Plan
            </Button>
          </Card.Footer>
        }
        </>
      }      
    </Card>
  );
}

function CardBody({plan}) {
  return (
    <Card.Body>
      {
        `Coach: ${plan.coachId}\nTrainee: ${plan.traineeId}`
      }
    </Card.Body>
  );
}