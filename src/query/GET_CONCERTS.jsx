import { gql } from "apollo-boost";

export const GET_CONCERTS = gql`
  query Get_Concerts($name: String!, $limit: Int, $skip: Int) {
    getConcerts(name: $name, limit: $limit, skip: $skip) {
      name
      id
    }
  }
`;
