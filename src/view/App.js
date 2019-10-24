import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './Navbar';
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import PlansPage from "./PlansPage";

export default function App() {

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/plans">
            <PlansPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/testing">
            <ProfilePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
