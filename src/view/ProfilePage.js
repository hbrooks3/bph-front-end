import React from "react";
import UseUser from "../presenter/User";

export default function ProfilePage(props) {
  const user = UseUser();

  return (
    <div>
      <h2>{user.firstName + " " + user.lastName}</h2>
    </div>
  );
}