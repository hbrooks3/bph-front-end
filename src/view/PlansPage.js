// react
import React from "react";

// react-bootstrap
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import PlanCard from './cards/PlanCard';
import LoadingUserCard from './cards/LoadingUserCard';

// actions
import { addPlan } from '../actions/users'

export default function PlansPage(props) {
  const user = useSelector(state=>state.users[state.auth.uid]);
  const dispatch = useDispatch();

  if (!user || !user.loaded) {
    return <LoadingUserCard />;
  }

  return (
    <>
    {user.accountType === 1 &&
      <Card border='white' onClick={()=>dispatch(addPlan(user.id))}>
        <Button variant="outline-primary" size="lg">
          Create Plan
          +
        </Button>
      </Card>
    }

    {user.plans &&
      user.plans.map(plan => <PlanCard key={plan} id={plan} preview />)
    }

    {user.plans && !user.plans.length &&
      <Card className="text-center">
        <Card.Body>
          {
            user.accountType ?
            'Click Create Plan to make your first plan!' :
            'You don\'t have any assigned plans.'
          }
        </Card.Body>
      </Card>
    }

    </>
  );
}