import React from "react";
import { Redirect } from "react-router-dom";
import { AUTH } from "../../query/AUTH";
import { GET_USER_TICKETS } from "../../query/GET_USER_TICKETS";
import { useQuery } from "@apollo/react-hooks";

import UserImage from "../../assets/4.jpg";
import "./index.scss";

export const User = () => {
  const { loading, data } = useQuery(AUTH);
  const { loading: loadingUserData, data: userData } = useQuery(
    GET_USER_TICKETS,
    {
      variables: { userId: data && data.auth.id, limit: 5, skip: 0 }
    }
  );
  console.log(userData);
  if (loading) return <p>Loading ...</p>;
  return (
    <>
      {!data.auth && <Redirect to="/login" />}
      <main className="user-page">
        <div className="tickets-list">
          <ul>
            {loadingUserData ? (
              <p>Loading...</p>
            ) : (
              <>
                {userData.getUserTickets.map(ticket => (
                  <li className="ticket-item">
                    <div className="item-description">
                      <p>{ticket.concertId.name}</p>
                      <p>{ticket.concertId.date}</p>
                      <p>{ticket.concertId.price}</p>
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
        <div className="user-info">
          <div className="user-avatar"></div>
          <div className="user-description">
            <p className="user-info-item">{data.auth.firstName}</p>
            <p className="user-info-item">{data.auth.lastName}</p>
            <p className="user-info-item">Rating</p>
          </div>
        </div>
      </main>
    </>
  );
};
