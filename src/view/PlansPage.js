import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import LoadingCard from './LoadingCard';

export default function PlansPage(props) {
  const user = useSelector(state=>state.users[state.auth.uid]);
  
  if (!user) {
    return <LoadingCard />;
  }

  const cards = user && user.plans.map(plan =>
    <PlanCard key={plan} planId={plan} />
  )

  return <CardColumns>{cards}</CardColumns>;
}

function PlanCard({planId}) {
  const plan = useSelector(state=>state.plans[planId]);

  if (!plan) {
    return <LoadingCard />;
  }

  return (
    <Card>
      {plan.id}
    </Card>
  );
}