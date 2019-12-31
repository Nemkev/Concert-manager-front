import React from "react";
import { Redirect } from "react-router-dom";
import { AUTH } from "../../query/AUTH";
import { useQuery } from "@apollo/react-hooks";

import UserImage from "../../assets/4.jpg";
import "./index.scss";

export const User = () => {
  const { loading, error, data } = useQuery(AUTH);
  if (loading) return <p>Loading ...</p>;
  return (
    <>
      {!data.auth && <Redirect to="/login" />}
      <main className="user-page">
        <div className="tickets-list">
          <ul>
            <li className="ticket-item">
              <div className="item-description">
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
            <li className="ticket-item">
              <div>
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
            <li className="ticket-item">
              <div>
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
            <li className="ticket-item">
              <div>
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
            <li className="ticket-item">
              <div>
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
            <li className="ticket-item">
              <div>
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
            <li className="ticket-item">
              <div>
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
            <li className="ticket-item">
              <div>
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
            <li className="ticket-item">
              <div>
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
            <li className="ticket-item">
              <div>
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
            <li className="ticket-item">
              <div>
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
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
