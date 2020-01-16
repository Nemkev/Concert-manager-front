import { gql } from "apollo-boost";

export const AUTH = gql`
  {
    auth {
      email
      firstName
      lastName
      id
    }
  }
`;
