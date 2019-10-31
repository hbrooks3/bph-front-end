import { useState, useEffect } from 'react';
import { ROOT } from './Root';

export function createAccount(email, password) {
  const apiRoute = ROOT + '/User/CreateAccount'

  fetch(
    apiRoute,
    {
      method: 'POST',
      body: JSON.stringify({email: email, password: password}),
    },
  );
}

export function useUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // const apiAddress = `${Root}/api/User/GetUser/`;
  
  // https://jsonplaceholder.typicode.com/
  const apiAddress = 'https://jsonplaceholder.typicode.com/posts/1';

  useEffect(() => {
    fetch(
      apiAddress,
      {
        method: `GET`,
      },
    ).then((response) => {
      return response.json();
    }).then((data) => { 
      console.log(data);
      setUser(data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
    });
  }, [apiAddress]);

  return { user, isLoading };
}