import React from "react";
import { Header } from "./modules/Header";
import { Footer } from "./modules/Footer";
import { Routers } from "./Router";

import "reset-css";
import "./App.css";

export const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <Routers />
      <Footer />
    </div>
  );
};

export default App;
