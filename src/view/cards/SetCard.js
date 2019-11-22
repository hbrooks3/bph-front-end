import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import FetchingCard from './FetchingCard'

// actions
import { getSet, dissmissSetError } from '../../actions/sets'

export default function SetCard({id, footer=false}) {
  const set = useSelector(state=>state.sets[id]);
  const dispatch = useDispatch();

  return (
    <Card>
      <Card.Header>Set</Card.Header>
      {(!set || !set.loaded) &&
        <FetchingCard
          id={id}
          type='sets'
          fetch={()=>dispatch(getSet(id))}
          dismissError={()=>dispatch(dissmissSetError(id))}
        />
      }
      {set && set.loaded &&
        <>
        <Card.Body>
          Set Loaded
        </Card.Body>
        
        {footer &&
          <Card.Footer>
            <Button>
              Mark Complete
            </Button>
          </Card.Footer>
        }
        </>
      }      
    </Card>
  );
}