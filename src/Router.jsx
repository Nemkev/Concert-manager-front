import React from "react";
import { Example } from "./components/example";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { User } from "./components/User";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "./App.css";

export const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/Home" component={Example} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Registration" component={Registration} />
        <Route exact path="/User" component={User} />
        <Redirect from="/" to="Home" />
      </Switch>
    </Router>
  );
};

export default Routers;
