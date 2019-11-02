import { useState, useEffect } from 'react';

let GlobalUser = {
  Email: "lifter1@gmail.com",
  FirstName: "Phil",
  LastName: "Myez",
  Height: "6'4\"",
  Weight: "800lbs",
}

let loggedIn = true;

export function createAccount(email, password) {
  console.log(`Creating account for ${email} with password: ${password}`);
}

export function loginUser(email, password) {
  loggedIn = true;
  console.log(`Logging in ${email} with password: ${password}`);
}

export function logoutUser() {
  loggedIn = false;
}

export function updateUser(newUser) {
  console.log(newUser);
  
  // console.log(Object.assign(GlobalUser, newUser));
}

export function useSession() {
  const [sessionStatus, setSessionStatus] = useState(false);

  useEffect(() => {
    console.log(loggedIn);
    setSessionStatus(loggedIn);
  },[]);

  return sessionStatus;
}

export function useUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(false);
    setUser(GlobalUser);
  }, []);

  return { user, isLoading };
}