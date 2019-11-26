import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../mutation/LOGIN";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";

export const Login = () => {
  let [email, setEmail] = useState("");
  let [hashPassword, setHashPassword] = useState("");
  let [isLoged, setLogin] = useState("");
  let [cookies, setCookies] = useCookies("");
  const [login, { error }] = useMutation(LOGIN, {
    variables: { email, hashPassword }
  });

  const handleSubmit = async () => {
    try {
      const { data } = await login();
      setCookies("access-token", data.login.accessToken);
      setCookies("refresh-token", data.login.refreshToken);
      setLogin(true);
    } catch (error) {
      console.log(error);
      setLogin(false);
    }
  };

  return (
    <>
      {isLoged && <Redirect to="/Home" />}
      <input type="text" onChange={e => setEmail(e.target.value)} />
      <input type="text" onChange={e => setHashPassword(e.target.value)} />
      <button onClick={handleSubmit}>Login</button>
    </>
  );
};
