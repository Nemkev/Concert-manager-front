import { gql } from "apollo-boost";

export const REGISTER = gql`
  mutation Registration(
    $email: String!
    $hashPassword: String!
    $firstName: String!
    $lastName: String!
  ) {
    register(
      email: $email
      hashPassword: $hashPassword
      firstName: $firstName
      lastName: $lastName
    )
  }
`;
