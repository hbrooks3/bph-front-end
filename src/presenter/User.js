import { useState, useEffect } from 'react';
import { ROOT } from './Root';

export function createAccount(email, password) {
  const apiRoute = ROOT + '/User/CreateUser'

  fetch(
    apiRoute,
    {
      method: 'POST',
      body: JSON.stringify({Email: email, Password: password}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
  );
}

export function loginUser(email, password) {
  const apiRoute = ROOT + '/User/LoginUser'

  fetch(
    apiRoute,
    {
      method: 'POST',
      body: JSON.stringify({Email: email, Password: password}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
  );
}

//TODO: Check if header is needed
export function logoutUser() {
  const apiRoute = ROOT + '/User/LogoutUser'

  fetch(
    apiRoute,
    {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Accept': 'application/json'
      // },
      credentials: 'include',
    },
  );
}

export function updateUser(user) {
  const apiRoute = ROOT + '/User/UpdateUser'

  fetch(
    apiRoute,
    {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
  );
}

export function useSession() {
  const [sessionStatus, setSessionStatus] = useState(false);

  const apiRoute = ROOT + '/User/CheckSessionStatus';

  useEffect(() => {
    fetch(
      apiRoute,
      {
        method: 'GET',
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
      setSessionStatus(data)
    }).catch((error) => {
      console.log(error);
    });
  }, [apiRoute]);

  return sessionStatus;
}

export function useUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const apiRoute = ROOT + '/User/GetCurrentUser';

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
      setUser(data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
    });
  }, [apiRoute]);

  return { user, isLoading };
}
