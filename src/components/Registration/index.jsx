import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { REGISTER } from "../../mutation/REGISTER";
import { LOGIN } from "../../mutation/LOGIN";

export const Registration = () => {
  let [email, setEmail] = useState("");
  let [hashPassword, setHashPassword] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [isLoged, setLogin] = useState("");
  let [cookies, setCookies] = useCookies(["access-token"]);

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
      setLogin(true);
    } catch (error) {
      setLogin(false);
      console.log(error);
    }
  };

  return (
    <>
      {isLoged && <Redirect to="/Home" />}
      <input type="text" onChange={e => setEmail(e.target.value)} />
      <input type="text" onChange={e => setHashPassword(e.target.value)} />
      <input type="text" onChange={e => setFirstName(e.target.value)} />
      <input type="text" onChange={e => setLastName(e.target.value)} />
      <button onClick={handleSubmit}>Register</button>
    </>
  );
};
