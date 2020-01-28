import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { AUTH } from "../../query/AUTH";
import { UNLOGIN } from "../../mutation/UNLOGIN";
import "./index.scss";
import { useEffect } from "react";

export const Header = () => {
  const [logged, setLogged] = useState(false);
  const { loading, error, data } = useQuery(AUTH);
  useEffect(() => {
    if (data && !data.auth) {
      setLogged("Sign in");
    } else {
      setLogged("Sign out");
    }
  }, [data]);

  const [unLogged] = useMutation(UNLOGIN);

  const logOut = async () => {
    await unLogged();
  };

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
        {/* <Link
          className="link"
          style={
            `${window.location.href}` === "http://localhost:3000/registration"
              ? { color: `#ff8b38` }
              : {}
          }
          to="/registration"
        >
          Registration
        </Link>
        <Link
          className="link"
          style={
            `${window.location.href}` === "http://localhost:3000/user"
              ? { color: `#ff8b38` }
              : {}
          }
          to="/user"
        >
          User
        </Link> */}
        <Link
          className="link"
          onClick={logOut}
          style={
            `${window.location.href}` === "http://localhost:3000/login"
              ? { color: `#ff8b38` }
              : {}
          }
          to="/login"
        >
          {logged}
        </Link>
      </div>
    </header>
  );
};
