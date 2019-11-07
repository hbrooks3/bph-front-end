// React imports
import React, {useCallback, useReducer, useMemo} from "react";

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

function reduceUser (state, action) {
  switch (action.type) {
    case 'edit':
      return {...state, ...action.value};
    default:
      throw new Error();
  }
}

const userFields = ['height', 'weight', 'lastName', 'firstName', 'email'];

function PageBody(props) {
  const initialUser = props.user;
  const [user, editUser] = useReducer(reduceUser, initialUser);

  const pushUpdate = () => {
    updateUser(user);
  };

  const resetForm = useCallback(() => {
    editUser({
      type: 'edit',
      value: initialUser,
    });
  }, [initialUser]);

  const updaters = useMemo(() => {
    return userFields.reduce((accumulator, key) => {
      accumulator[key] = (value) => {
        let newUser = {};
        newUser[key] = value;
        editUser({
          type: 'edit',
          value: newUser,
        });
      };
      return accumulator;
    }, {});
  }, [])

  const cards = [
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

  const pageDisplay = cards.map((card, index) =>
    <EditableCard key={index} {...card}/>
  );

  return (<CardColumns>{pageDisplay}</CardColumns>);
}
