import { useState, useEffect } from 'react';

let GlobalUser = {
  email: "lifter1@gmail.com",
  firstName: "Phil",
  lastName: "Myez",
  height: "6'4\"",
  weight: "800lbs",
}

let loggedIn = true;

let editUser = null;

let editStatus = null;

export function createAccount(email, password) {
  console.log(`Creating account for ${email} with password: ${password}`);
}

export function loginUser(email, password, callback) {
  // editStatus(true);
  console.log(`Logging in ${email} with password: ${password}`);
  setTimeout(callback, 100);
}

export function logoutUser() {
  editStatus(false);
}

export function updateUser(newUser) {
  console.log(`User synced with server:`);
  console.log(newUser);

  editUser(newUser);
}

export function useSession() {
  const [sessionStatus, setSessionStatus] = useState(true);

  editStatus = setSessionStatus;

  useEffect(() => {
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
