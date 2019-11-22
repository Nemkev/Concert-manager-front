import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const LOGIN = gql`
  mutation Login($email: String!, $hashPassword: String!) {
    login(email: $email, hashPassword: $hashPassword) {
      id
      email
      hashPassword
    }
  }
`;

export const Login = () => {
  let input;
  const [
    login,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(LOGIN);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          login({
            variables: { email: input.value, hashPassword: input.value }
          });
          input.value = "";
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Login</button>
      </form>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </div>
  );
};
