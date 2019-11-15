import React from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// redux
import { useSelector } from 'react-redux';

// views
import FetchingCard from './FetchingCard'

export default function SetCard({id, footer=false}) {
  const set = useSelector(state=>state.sets[id]);

  return (
    <Card>
      <Card.Header>Set</Card.Header>
      {(!set || !set.isLoaded) &&
        <FetchingCard
          id={id}
          type='sets'
          fetch={()=>{}}
          dismissError={()=>{}}
        />
      }
      {set && set.isLoaded &&
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