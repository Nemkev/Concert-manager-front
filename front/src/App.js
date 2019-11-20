import React from "react";
import logo from "./logo.svg";
import Example from "../src/components/example";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/Home" component={Example} />
          <Redirect from="/" to="Home" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
