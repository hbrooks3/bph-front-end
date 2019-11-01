import { useState, useEffect } from 'react';
import { ROOT } from './Root';

export function createPlan(plan) {
  const apiRoute = ROOT + '/Coach/CreatePlan'

  fetch(
    apiRoute,
    {
      method: 'POST',
      body: JSON.stringify(plan),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
  );
}

export function createWorkout(workout, planID) {
  const apiRoute = ROOT + '/Coach/CreateWorkout'

  fetch(
    apiRoute,
    {
      method: 'POST',
      body: JSON.stringify({planId: planID, Workout: workout}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
  );
}

export function usePlan() {
  const [isLoading, setIsLoading] = useState(true);
  const [plan, setPlan] = useState(null);

  const apiRoute = ROOT + '/Coach/GetPlan';

  useEffect(() => {
    fetch(
      apiRoute,
      {
        method: `GET`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
      },
    ).then((response) => {
      console.log("FETCH!");
      return response.json();
    }).then((data) => { 
      console.log(data);
      setPlan(data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
    });
  }, [apiRoute]);

  return { plan, isLoading };
}

export function useWorkout() {
  const [isLoading, setIsLoading] = useState(true);
  const [workout, setWorkout] = useState(null);

  const apiRoute = ROOT + '/Coach/GetWorkout';

  useEffect(() => {
    fetch(
      apiRoute,
      {
        method: `GET`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
      },
    ).then((response) => {
      console.log("FETCH!");
      return response.json();
    }).then((data) => { 
      console.log(data);
      setWorkout(data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
    });
  }, [apiRoute]);

  return { workout, isLoading };
}