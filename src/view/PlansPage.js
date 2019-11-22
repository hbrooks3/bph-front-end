import React from "react";

// react-bootstrap
import Card from "react-bootstrap/Card";

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import PlanCard from './cards/PlanCard';

// actions
import { addPlan } from '../actions/users';

export default function PlansPage(props) {
  const user = useSelector(state=>state.users[state.auth.uid]);
  const dispatch = useDispatch();

  const cards = (user && user.plans &&
    user.plans.map(plan => <PlanCard key={plan} id={plan} footer />)
  );

  return (
    <>
      <Card className="text-center" onClick={()=>dispatch(addPlan(user.id))}>
        <Card.Body>
          <h1>Create Plan</h1>
        </Card.Body>
      </Card>
      {cards}
    </>
  );
}