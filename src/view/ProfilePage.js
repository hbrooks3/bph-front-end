import React from "react";
// import UseUser from "../dummy-presenter/User";
import UseUser from "../presenter/User";

export default function ProfilePage(props) {
  const { user, isLoading } = UseUser();

  return (
    <div>
      <h2>
      {isLoading || user == null ? "Loading..." : user.firstName + " " + user.lastName}
      </h2>
    </div>
  );
}