import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

export const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1 className="cite-name">Ticket paradise</h1>
      </div>
      <div className="router-bar">
        <Link
          className="link"
          style={
            `${window.location.href}` === "http://localhost:3000/home"
              ? { color: `#ff8b38` }
              : {}
          }
          to="/home"
        >
          Home
        </Link>
        <Link
          className="link"
          style={
            `${window.location.href}` === "http://localhost:3000/concerts"
              ? { color: `#ff8b38` }
              : {}
          }
          to="/concerts"
        >
          Concerts
        </Link>
        <Link
          className="link"
          style={
            `${window.location.href}` === "http://localhost:3000/login"
              ? { color: `#ff8b38` }
              : {}
          }
          to="/login"
        >
          Sign in
        </Link>
      </div>
    </header>
  );
};
