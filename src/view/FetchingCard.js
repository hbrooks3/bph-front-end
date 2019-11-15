// react
import React, { useEffect } from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';

// views
import LoadingCard from './LoadingCard';
import ErrorAlert from './ErrorAlert';

// redux
import { useSelector } from 'react-redux';

export default function FetchingCardBody ({type, id, fetch, dismissError}) {
  const item = useSelector(state=>state[type][id]);

  useEffect(()=>{
    if (item == null || (!item.isFetching && !item.isError && !item.isLoaded)) {
      fetch(id);
    }
  });

  if (item && item.isError) {
    return (
      <Card border="light">
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

  return <LoadingCard />;
}