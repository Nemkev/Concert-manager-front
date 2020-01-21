import { gql } from "apollo-boost";

export const GET_USER_TICKETS = gql`
  query Get_User_Tickets($userId: String!, $limit: Int, $skip: Int) {
    getUserTickets(userId: $userId, limit: $limit, skip: $skip) {
      concertId {
        name
        price
        date
      }
    }
  }
`;
