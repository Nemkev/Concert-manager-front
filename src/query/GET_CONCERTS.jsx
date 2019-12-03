import { gql } from "apollo-boost";

export const GET_CONCERTS = gql`
  query Get_Concerts($name: String!) {
    getConcerts(name: $name) {
      name
      id
    }
  }
`;
