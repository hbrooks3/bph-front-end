import { useState, useEffect } from 'react';

export default function useUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(false);
    setUser({
      userName: "bigGuy",
      email: "lifter1@gmail.com",
      firstName: "Phil",
      lastName: "Myez",
      height: "6'4\"",
      weight: "800lbs",
    });
  }, []);

  return { user, isLoading };
}