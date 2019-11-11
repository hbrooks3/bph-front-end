import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from './Navbar';
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import PlansPage from "./PlansPage";
// import CreatePlan from "./CreatePlan";
import LandingPage from "./LandingPage";

// redux
import { useSelector } from 'react-redux';

export default function App() {
  return (
    <Router>
      <>
        <Navbar />

        <Switch>
          <Route exact path="/welcome">
            <LandingPage />
          </Route>
          <PrivateRoute exact path="/">
            <HomePage />
          </PrivateRoute>
          <PrivateRoute path="/plans">
            <PlansPage />
          </PrivateRoute>
          <PrivateRoute path="/create-Plan">
            {/* <CreatePlan /> */}
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute path="/testing">
            <ProfilePage />
          </PrivateRoute>
        </Switch>
      </>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
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
              pathname: "/welcome",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
