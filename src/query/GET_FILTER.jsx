import { gql } from "apollo-boost";

export const GET_FILTER = gql`
  query Get_Filter(
    $name: String!
    $city: String
    $date: String
    $limit: Int
    $skip: Int
  ) {
    getFilter(
      name: $name
      city: $city
      date: $date
      limit: $limit
      skip: $skip
    ) {
      name
      city
      id
      concerts {
        name
        date
        id
      }
    }
  }
`;
