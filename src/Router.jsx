import React from "react";
import Example from "./components/example";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Header } from "./modules/Header";
import { Footer } from "./modules/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/Home" component={Example} />
          <Redirect from="/" to="Home" />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
