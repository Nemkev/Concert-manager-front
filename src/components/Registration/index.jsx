import React, { useState, useReducer } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { REGISTER } from "../../mutation/REGISTER";
import { LOGIN } from "../../mutation/LOGIN";

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
    <>
      <input value={email} name="email" onChange={handleChange} />
      <input
        type="password"
        name="hashPassword"
        value={hashPassword}
        onChange={handleChange}
      />
      <input name="firstName" value={firstName} onChange={handleChange} />
      <input name="lastName" value={lastName} onChange={handleChange} />
      <button onClick={handleSubmit}>Register</button>
    </>
  );
};
