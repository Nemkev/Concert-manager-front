import React, { useState, useReducer } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../mutation/LOGIN";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";

import "./index.scss";

export const Login = () => {
  const [_, setCookies] = useCookies(["access-token", "refresh-token"]);
  const [
    {
      email,
      hashPassword,
      isLoged,
      correctEmail,
      correctPassword,
      errorMessage
    },
    setState
  ] = useReducer((s, a) => ({ ...s, ...a }), {
    email: "",
    hashPassword: "",
    correctEmail: "",
    correctPassword: "",
    isLoged: false,
    errorMessage: ""
  });
  const [login] = useMutation(LOGIN, {
    variables: { email, hashPassword }
  });

  const handleChange = ({ target: { value, name } }) => {
    if (name === "email") {
      value.includes("@") !== true
        ? setState({
            correctEmail: 'You should write "@"',
            errorMessage: "Incorrect email",
            [name]: value
          })
        : setState({
            correctEmail: "",
            errorMessage: "",
            [name]: value
          });
    }
    if (name === "hashPassword") {
      value.length !== 8 && value.length <= 8
        ? setState({
            correctPassword: `You should write ${8 - value.length}`,
            errorMessage: "Password too small",
            [name]: value
          })
        : setState({
            correctPassword: "",
            errorMessage: "",
            [name]: value
          });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await login();
      setCookies("access-token", data.login.accessToken);
      setCookies("refresh-token", data.login.refreshToken);
      setState({
        isLoged: true
      });
    } catch (error) {
      console.log(error);
      setState({ errorMessage: "Incorrect password or email", isLoged: false });
    }
  };

  return isLoged ? (
    <Redirect to="/user" />
  ) : (
    <main className="login-layer">
      <form className="login-form">
        <h2 className="title">Login</h2>
        <input
          placeholder="email"
          className="email-input"
          type="email"
          name="email"
          required
          value={email}
          onChange={handleChange}
        />
        {correctEmail && <p className="error-message">{correctEmail}</p>}
        <input
          placeholder="password"
          className="password-input"
          type="password"
          name="hashPassword"
          required
          value={hashPassword}
          onChange={handleChange}
        />
        {correctPassword && <p className="error-message">{correctPassword}</p>}
        <button className="login-button" onClick={handleSubmit}>
          Submit
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </main>
  );
};
