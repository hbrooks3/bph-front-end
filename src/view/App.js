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
// import CreatePlan from "./CreatePlan";
import { useSession } from "../dummy-presenter/User";
// import { useSession } from "../presenter/User";

export default function App() {
  const sessionStatus = useSession();

  return (
    <Router>
      <div>
        <Navbar />
        {sessionStatus ?
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/plans">
              <PlansPage />
            </Route>
            <Route path="/create-Plan">
              {/* <CreatePlan /> */}
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/testing">
              <ProfilePage />
            </Route>
          </Switch> :
          <h1>Login to Access Page</h1>
        }
      </div>
    </Router>
  );
}
