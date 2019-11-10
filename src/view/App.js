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

// import { useSession } from "../dummy-presenter/User";
// import { useSession } from "../presenter/User";

export default function App() {
  return (
    <Router>
      <>
        <Navbar />

        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <PrivateRoute exact path="/Home">
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
  const sessionStatus = true;

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
