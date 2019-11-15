import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// redux
import { useSelector } from 'react-redux';

// views
import FetchingCard from './FetchingCard'

// react-router
import { useHistory } from 'react-router-dom';

export default function PlanCard({id, footer=false, editable=false}) {
  const plan = useSelector(state=>state.plans[id]);
  const history = useHistory();

  return (
    <Card>
      <Card.Header>Plan</Card.Header>
      {(!plan || !plan.isLoaded) &&
        <FetchingCard
          id={id}
          type='plans'
          fetch={()=>{}}
          dismissError={()=>{}}
        />
      }
      {plan && plan.isLoaded &&
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
        `Coach: ${plan.coach}\nTrainee: ${plan.trainee}`
      }
    </Card.Body>
  );
}