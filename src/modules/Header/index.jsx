import React from "react";
import "./index.scss";

export const Header = () => {
  const activeRoute = window.location.href;

  // console.log(document.getElementsByClassName("router-bar"));
  return (
    <header className="header">
      <div className="logo">
        <h1 className="cite-name">Ticket paradise</h1>
      </div>
      <div className="router-bar">
        <a
          className="link"
          style={
            `${window.location.href}` === "http://localhost:3000/home"
              ? { color: `#ff8b38` }
              : {}
          }
          href="f"
        >
          Home
        </a>
        <a
          className="link"
          style={
            `${window.location.href}` === "http://localhost:3000/concerts"
              ? { color: `#ff8b38` }
              : {}
          }
          href="f"
        >
          Concerts
        </a>
        <a
          className="link"
          style={
            `${window.location.href}` === "http://localhost:3000/login"
              ? { color: `#ff8b38` }
              : {}
          }
          href="f"
        >
          Sign in
        </a>
      </div>
    </header>
  );
};
