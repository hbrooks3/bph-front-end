import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';

// redux
import { useSelector } from 'react-redux';

// views
import LoadingCard from './LoadingCard';
import FetchingCard from './FetchingCard'

// react-router
import { useHistory } from 'react-router-dom';

export default function PlansPage(props) {
  const user = useSelector(state=>state.users[state.auth.uid]);

  const cards = (
    user ?
    user.plans.map(plan => <PlanCard key={plan} planId={plan} />) :
    <LoadingCard />
  );

  return (
    <CardColumns>
      {cards}
    </CardColumns>
  );
}

function PlanCard({planId}) {
  const plan = useSelector(state=>state.plans[planId]);
  const history = useHistory();

  if (!plan) {
    return <FetchingCard 
      id={planId}
      type='plans'
      fetch={()=>{}}
      dismissError={()=>{}}
    />;
  }

  return (
    <Card>
      <Card.Header>
        {plan.id}
      </Card.Header>
      <Card.Footer>
        <Button onClick={()=>history.push(`/plan/${planId}`)}>
          View Workout
        </Button>
      </Card.Footer>
    </Card>
  );
}