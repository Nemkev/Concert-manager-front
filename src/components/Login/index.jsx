import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../mutation/LOGIN";
import { useCookies } from "react-cookie";

export const Login = () => {
  let [email, setEmail] = useState("");
  let [hashPassword, setHashPassword] = useState("");
  let [cookies, setCookies] = useCookies(["access-token"]);
  const [login, { error }] = useMutation(LOGIN, {
    variables: { email, hashPassword }
  });

  const handleSubmit = async () => {
    const data = await login();
    setCookies("access-token", data.data.login.accessToken);
    setCookies("refresh-token", data.data.login.refreshToken);
    console.log(data);
  };

  if (error) {
    console.log("error: ", error);
  }
  return (
    <>
      <input type="text" onChange={e => setEmail(e.target.value)} />
      <input type="text" onChange={e => setHashPassword(e.target.value)} />
      <button onClick={handleSubmit}>Login</button>
    </>
  );
};
