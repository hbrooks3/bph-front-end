import { useState, useEffect } from 'react';

export default function UseUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const apiAddress = `.../api/User/GetUser/`;

  useEffect(() => {
    fetch(
      apiAddress,
      {
        method: `GET`,
      },
    ).then((response) => {
      response.json();
    }).then((data) => {
      setUser(data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
    });
  }, [apiAddress]);

  return { user, isLoading };
}