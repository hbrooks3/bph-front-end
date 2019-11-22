// react
import React from "react";

// react-router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// views
import Navbar from './Navbar';
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import PlansPage from "./PlansPage";
import PlanPage from "./PlanPage";
import WorkoutPage from "./WorkoutPage";
import ExercisePage from './ExercisePage'

// redux
import { useSelector } from 'react-redux';

export default function App() {
  return (
    <Router>
      <>
        <Navbar />

        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>          
          <PrivateRoute path="/plans">
            <PlansPage />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute path="/plan/:id">
            <PlanPage />
          </PrivateRoute>
          <PrivateRoute path="/workout/:id">
            <WorkoutPage />
          </PrivateRoute>
          <PrivateRoute path="/exercise/:id">
            <ExercisePage />
          </PrivateRoute>
          <Route path="*">
            <Redirect to="/"/>
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export function PrivateRoute({ children, ...rest }) {
  const auth = useSelector(state => state.auth);

  if (auth.loading) {
    return <></>;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
      auth.loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}