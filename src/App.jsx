import React from "react";
import { Header } from "./modules/Header";
import { Footer } from "./modules/Footer";
import { Routers } from "./Router";
import { BrowserRouter as Router } from "react-router-dom";

import "reset-css";
import "./App.css";

export const App = () => {
  return (
    <Router>
      <Header />
      <Routers />
      <Footer />
    </Router>
  );
};

export default App;
