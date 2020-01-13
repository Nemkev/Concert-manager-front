import React from "react";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { User } from "./components/User";
import { Concerts } from "./components/Concerts";
import { Booking } from "./components/Booking";
import { About } from "./components/About";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

export const Routers = () => {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/user" component={User} />
        <Route exact path="/concerts" component={Concerts} />
        <Route exact path="/booking" component={Booking} />
        <Route exact path="/about" component={About} />
        <Redirect from="/" to="home" />
      </Switch>
    </div>
  );
};

export default Routers;
