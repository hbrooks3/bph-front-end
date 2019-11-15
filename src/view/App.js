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
import WorkoutPage from "./WorkoutPage";
// import CreatePlan from "./CreatePlan";

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
            <WorkoutPage />
          </PrivateRoute>
          <PrivateRoute path="/workout/:id">
            <WorkoutPage />
          </PrivateRoute>
          <PrivateRoute path="/exercise/:id">
            <WorkoutPage />
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
  const sessionStatus = useSelector(state => state.auth.loggedIn);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        sessionStatus ? (
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