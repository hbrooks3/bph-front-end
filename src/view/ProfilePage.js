// React imports
import React, {useState} from "react";

// Bootstrap Imports
import CardColumns from 'react-bootstrap/CardColumns';
import Spinner from 'react-bootstrap/Spinner';

// Custom Components
import EditableCard from './EditableCard';

// Presenter imports
import { useUser, updateUser } from "../dummy-presenter/User";
// import { useUser, updateUser } from "../presenter/User";

export default function ProfilePage(props) {
  const { user, isLoading } = useUser();

  return (
    <>
      {isLoading && (
        <Spinner animation="grow">
          <span className="sr-only">Loading...</span>
        </Spinner>)}
      {!isLoading && user && (
        <PageBody user={user}/>
      )}
    </>
  );
}

function PageBody(props) {
  const initialUser = props.user;

  const [user, editUser] = useState(initialUser);

  const pushUpdate = () => {
    updateUser(user);
  };

  function resetForm() {
    editUser(initialUser);
  }

  // An object contiaining an update function for each value in a user
  const updaters = Object.keys(user).reduce((accumulator, key) => {
    accumulator[key] = (value) => {
      let newUser = {...user};
      newUser[key] = value;
      editUser(newUser);
    };
    return accumulator;
  }, {});

  const pageData = [
    {
      title: `General Information`,
      fields: [
        {label: `Height`, value: user.height, update: updaters.height},
        {label: `Weight`, value: user.weight, update: updaters.weight},
      ],
      submit: pushUpdate,
      reset: resetForm,
    },
    {
      title: `Contact Information`,
      fields: [
        {label: `First Name`, value: user.firstName, update: updaters.firstName},
        {label: `Last Name`, value: user.lastName, update: updaters.lastName},
        {label: `Email`, value: user.email, update: updaters.email},
      ],
      submit: pushUpdate,
      reset: resetForm,
    },
  ];

  const pageDisplay = pageData.map((card, index) =>
    <EditableCard key={index} {...card}/>
  );

  return (<CardColumns>{pageDisplay}</CardColumns>);
}
