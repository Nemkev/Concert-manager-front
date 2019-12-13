import React from "react";
import "./index.scss";

export const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1 className="cite-name">Ticket paradise</h1>
      </div>
      <div className="link-bar">
        <a className="link" href="">
          Home
        </a>
        <a className="link" href="">
          Concerts
        </a>
        <a className="link" href="">
          Sign in
        </a>
      </div>
    </header>
  );
};
