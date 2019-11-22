import React from "react";
import Example from "./components/example";
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
        <Redirect from="/" to="Home" />
      </Switch>
    </Router>
  );
};

export default Routers;
