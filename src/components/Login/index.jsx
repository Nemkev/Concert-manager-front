import React, { useState, useReducer } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../mutation/LOGIN";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";

import "./index.scss";

export const Login = () => {
  const [_, setCookies] = useCookies("");
  const [{ email, hashPassword, isLoged }, setState] = useReducer(
    (s, a) => ({ ...s, ...a }),
    { email: "", hashPassword: "", isLoged: false }
  );
  const [login, { error }] = useMutation(LOGIN, {
    variables: { email, hashPassword }
  });

  const handleChange = ({ target: { value, name } }) =>
    setState({
      [name]: value
    });

  const handleSubmit = async () => {
    try {
      const { data } = await login();
      setCookies("access-token", data.login.accessToken);
      setCookies("refresh-token", data.login.refreshToken);
      setState({
        isLoged: true
      });
    } catch (error) {
      console.log(error);
      setState({
        isLoged: false
      });
    }
  };

  return isLoged ? (
    <Redirect to="/user" />
  ) : (
    <main className="login">
      <div className="form-wrapper">
        <h2 className="form-tagline">Enjoy us</h2>
        <p className="form-description">
          Wanna see you in the concert, lets bye the ticket now
        </p>
        <input
          className="input-item"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          className="input-item"
          type="password"
          name="hashPassword"
          value={hashPassword}
          onChange={handleChange}
        />
        <button className="login-button" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </main>
  );
};
