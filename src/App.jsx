import React from "react";
import { CookiesProvider } from "react-cookie";
import { Header } from "./modules/Header";
import { Footer } from "./modules/Footer";
import { Routers } from "./Router";
import { BrowserRouter as Router } from "react-router-dom";

import "reset-css";
import "./App.css";

export const App = () => {
  return (
    <CookiesProvider>
      <Router>
        <Header />
        <Routers />
        <Footer />
      </Router>
    </CookiesProvider>
  );
};

export default App;
