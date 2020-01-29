import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "react-sidebar";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { AUTH } from "../../query/AUTH";
import { UNLOGIN } from "../../mutation/UNLOGIN";
import "./index.scss";
import { useEffect } from "react";

export const Header = () => {
  const [logged, setLogged] = useState("Sing in");
  const { loading, error, data } = useQuery(AUTH);
  const stylePreset = { textDecoration: "none", marginTop: "20px" };
  const [sidebarState, setSidebarState] = useState(false);
  const [visible, setVisible] = useState("hidden");
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

  const onSetSidebarOpen = () => {
    setVisible("hidden");
    setSidebarState(false);
  };

  const style = {
    sidebar: {
      background: "white",
      width: "300px"
    },
    overlay: {
      zIndex: "1",
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      opacity: "0",
      visibility: "hidden",
      transition: "opacity .3s ease-out, visibility .3s ease-out",
      backgroundColor: "rgba(0,0,0,.3)"
    },
    root: {
      position: "fixed",
      zIndex: 5,
      visibility: `${visible}`,
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      overflow: "hidden"
    },
    dragHandle: {
      zIndex: "1",
      position: "fixed",
      top: "0",
      bottom: "0"
    }
  };

  return (
    <header className="header">
      <Sidebar
        sidebar={
          <>
            <div className="nav-menu">
              <h2 className="sidebar-name">Navigation</h2>
              <span
                className="close-aside"
                onClick={e => {
                  e.preventDefault();
                  setVisible("hidden");
                  setSidebarState(false);
                }}
              >
                +
              </span>
            </div>
            <div className="route-bar">
              <Link to="/user" style={stylePreset}>
                <p className="route-way">User</p>
              </Link>
              <Link to="/concerts" style={stylePreset}>
                <p className="route-way">Concerts</p>
              </Link>
              <Link to="/home" style={stylePreset}>
                <p className="route-way">Home</p>
              </Link>
              <Link to="/registration" style={stylePreset}>
                <p className="route-way">Registration</p>
              </Link>
              <Link to="/login" style={stylePreset} onClick={logOut}>
                <p className="route-way">{logged}</p>
              </Link>
            </div>
          </>
        }
        open={sidebarState}
        styles={style}
        onSetOpen={onSetSidebarOpen}
      />
      <div className="logo">
        <h1 className="cite-name">Ticket paradise</h1>
        <span
          className="hamburger"
          onClick={e => {
            e.preventDefault();
            setVisible("visible");
            setSidebarState(true);
          }}
        >
          &#9776;
        </span>
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
            `${window.location.href}` === "http://localhost:3000/user"
              ? { color: `#ff8b38` }
              : {}
          }
          to="/user"
        >
          User
        </Link>
        <Link
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
