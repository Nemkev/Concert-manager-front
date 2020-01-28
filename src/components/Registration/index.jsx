import React, { useReducer } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { REGISTER } from "../../mutation/REGISTER";
import { LOGIN } from "../../mutation/LOGIN";

import "./index.scss";

export const Registration = () => {
  const [
    {
      email,
      hashPassword,
      firstName,
      lastName,
      isLoged,
      correctEmail,
      correctFirstName,
      correctLastName,
      correctPassword,
      errorMessage
    },
    setState
  ] = useReducer((s, a) => ({ ...s, ...a }), {
    email: "",
    hashPassword: "",
    firstName: "",
    lastName: "",
    isLoged: false,
    correctEmail: "",
    correctFirstName: "",
    correctLastName: "",
    correctPassword: "",
    errorMessage: ""
  });

  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
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
            [name]: value
          })
        : setState({
            correctPassword: "",
            [name]: value
          });
    }
    if (name === "firstName") {
      value.length !== 2 && value.length < 2
        ? setState({
            correctFirstName: `You should write ${2 - value.length}`,
            [name]: value
          })
        : setState({
            correctFirstName: "",
            [name]: value
          });
    }
    if (name === "lastName") {
      value.length !== 2 && value.length < 2
        ? setState({
            correctLastName: `You should write ${2 - value.length}`,
            [name]: value
          })
        : setState({
            correctLastName: "",
            [name]: value
          });
    }
  };

  const [, setCookies] = useCookies("");

  const [registration] = useMutation(REGISTER, {
    variables: { email, hashPassword, firstName, lastName }
  });

  const [login] = useMutation(LOGIN, {
    variables: { email, hashPassword }
  });

  const handleSubmit = async e => {
    e.preventDefault();
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
        isLoged: false,
        errorMessage: "Please, check and input all fields"
      });
      console.log(error);
    }
  };

  if (isLoged) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="registration-layer">
      <form className="registration-form">
        <h2 className="title">Registration</h2>
        <input
          placeholder="email"
          className="email-input"
          type="email"
          required
          value={email}
          name="email"
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
        <input
          placeholder="first name"
          className="first-name-input"
          type="text"
          name="firstName"
          required
          value={firstName}
          onChange={handleChange}
        />
        {correctFirstName && (
          <p className="error-message">{correctFirstName}</p>
        )}
        <input
          placeholder="second name"
          className="last-name-input"
          type="text"
          pattern="[A-Za-z]{2,}"
          required
          name="lastName"
          value={lastName}
          onChange={handleChange}
        />
        {correctLastName && <p className="error-message">{correctLastName}</p>}
        <button className="register-button" onClick={handleSubmit}>
          Submit
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};
