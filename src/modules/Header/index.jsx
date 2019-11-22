import React from "react";
import "./index.scss";

export const Header = () => {
  return (
    <header>
      <div className="logo">
        <h1>Ticket paradise</h1>
      </div>
      <div className="link-bar">
        <a href="">Home</a>
        <a href="">Concerts</a>
        <a href="" className="authorization">
          Sign in
        </a>
      </div>
    </header>
  );
};
