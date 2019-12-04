import React from "react";
import { Header } from "./modules/Header";
import { Footer } from "./modules/Footer";
import { Routers } from "./Router";

import "reset-css";
import "./App.css";

export const App = () => {
  return (
    <>
      <Header />
      <Routers />
      <Footer />
    </>
  );
};

export default App;
