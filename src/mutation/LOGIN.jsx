import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation Login($email: String!, $hashPassword: String!) {
    login(email: $email, hashPassword: $hashPassword) {
      id
      email
      hashPassword
      accessToken
      refreshToken
    }
  }
`;
