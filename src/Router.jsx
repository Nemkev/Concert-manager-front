import React from "react";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { User } from "./components/User";
import { Concerts } from "./components/Concerts";
import { About } from "./components/About";
import { Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from "../src/components/Error";

import "./App.css";

export const Routers = () => {
  return (
    <div className="wrapper">
      <ErrorBoundary>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/user" component={User} />
          <Route exact path="/concerts" component={Concerts} />
          <Route exact path="/about/:concertId" component={About} />
          <Redirect from="/" to="home" />
        </Switch>
      </ErrorBoundary>
    </div>
  );
};

export default Routers;
