// react
import React, { useEffect } from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

// views
// import LoadingCard from './LoadingCard';
import ErrorAlert from '../ErrorAlert';

// redux
import { useSelector } from 'react-redux';

export default function FetchingCardBody ({type, id, fetch, dismissError}) {
  const item = useSelector(state=>state[type][id]);

  useEffect(()=>{
    if (item == null || !(item.loading || item.error || item.loaded)) {
      fetch();
    }
  });

  if (item && item.loaded) {
    return;
  }

  if (item && item.error) {
    return (
      <Card>
        <Card.Body>
          <ErrorAlert
            heading='Loading Error'
            message={item.errorMessage}
            callback={dismissError}
          />
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card>
      <Card.Body>
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      </Card.Body>;
    </Card>
  )
}