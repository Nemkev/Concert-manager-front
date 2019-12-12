import React, { useState, useReducer } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { REGISTER } from "../../mutation/REGISTER";
import { LOGIN } from "../../mutation/LOGIN";

import "./index.scss";

export const Registration = () => {
  const [
    { email, hashPassword, firstName, lastName, isLoged },
    setState
  ] = useReducer((s, a) => ({ ...s, ...a }), {
    email: "",
    hashPassword: "",
    firstName: "",
    lastName: "",
    isLoged: false
  });

  const handleChange = ({ target: { value, name } }) =>
    setState({
      [name]: value
    });

  const [cookies, setCookies] = useCookies("");

  const [registration, { error }] = useMutation(REGISTER, {
    variables: { email, hashPassword, firstName, lastName }
  });

  const [login] = useMutation(LOGIN, {
    variables: { email, hashPassword }
  });

  const handleSubmit = async () => {
    try {
      await registration();
      const { data } = await login();
      setCookies("access-token", data.login.accessToken);
      setCookies("refresh-token", data.login.refreshToken);
      setState({
        isLoged: true
      });
    } catch (error) {
      setState({
        isLoged: false
      });
      console.log(error);
    }
  };

  if (isLoged) {
    return <Redirect to="/" />;
  }

  return (
    <div className="registration-layer">
      <form action="" className="registration-form">
        <h2 className="title">Registration</h2>
        <input
          placeholder="email"
          className="email-input"
          type="email"
          value={email}
          name="email"
          onChange={handleChange}
        />
        <input
          placeholder="password"
          className="password-input"
          type="password"
          name="hashPassword"
          value={hashPassword}
          onChange={handleChange}
        />
        <input
          placeholder="first name"
          className="first-name-input"
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
        />
        <input
          placeholder="second name"
          className="last-name-input"
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
        />
        <button className="register-button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};
