import { gql } from "apollo-boost";

export const LIST_OF_ADDITIONAL = gql`
  query getAdditional($name: String!, $limit: Int, $skip: Int) {
    getAdditions(name: $name, limit: $limit, skip: $skip) {
      name
      price
      id
    }
  }
`;
