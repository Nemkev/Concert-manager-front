import React from "react";
import { Example } from "./components/example";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { User } from "./components/User";
import { Concerts } from "./components/Concerts";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "./App.css";

export const Routers = () => {
  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route exact path="/home" component={Example} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/user" component={User} />
          <Route exact path="/concerts" component={Concerts} />
          <Redirect from="/" to="home" />
        </Switch>
      </Router>
    </div>
  );
};

export default Routers;
