import { useState, useEffect } from 'react';

let GlobalUser = {
  email: "lifter1@gmail.com",
  firstName: "Phil",
  lastName: "Myez",
  height: "6'4\"",
  weight: "800lbs",
}

let loggedIn = true;

let counter = 0;

let editUser = null;

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
  console.log(++counter);

  GlobalUser = newUser;

  editUser(newUser);
  
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
  const [user, setUser] = useState(GlobalUser);

  editUser = setUser;

  useEffect(() => {
    setIsLoading(false);
    setUser(GlobalUser);
  }, []);

  return { user, isLoading};
}