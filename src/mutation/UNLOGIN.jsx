import { gql } from "apollo-boost";

export const UNLOGIN = gql`
  mutation unLogin {
    unLogin {
      refreshToken
    }
  }
`;
