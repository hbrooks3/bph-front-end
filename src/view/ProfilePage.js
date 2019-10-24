import React from "react";
// import UseUser from "../dummy-presenter/User";
import UseUser from "../presenter/User";

export default function ProfilePage(props) {
  const { user, isLoading } = UseUser();

  return (
    <div>
      <h2>
      {isLoading && "Loading..."}
      {!isLoading && user && `User ID: ${user.id}`}
      </h2>
    </div>
  );
}