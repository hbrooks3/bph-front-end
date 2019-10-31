import { useState, useEffect } from 'react';

export function createAccount(email, password) {
  console.log(`Creating account for ${email} with password: ${password}`);
}

export function useUser() {
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