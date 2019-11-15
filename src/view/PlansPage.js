import React from "react";

// react-bootstrap

// redux
import { useSelector } from 'react-redux';

// views
import PlanCard from './cards/PlanCard';

export default function PlansPage(props) {
  const user = useSelector(state=>state.users[state.auth.uid]);

  const cards = (user && user.plans &&
    user.plans.map(plan => <PlanCard key={plan} id={plan} footer />)
  );

  return (
    <>
      {cards}
    </>
  );
}