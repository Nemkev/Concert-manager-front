import React from "react";
import { Redirect } from "react-router-dom";
import { AUTH } from "../../query/AUTH";
import { useQuery } from "@apollo/react-hooks";

import UserImage from "../../assets/4.jpg";
import "./index.scss";

export const User = () => {
  const { loading, error, data } = useQuery(AUTH);
  if (loading) return <p>Loading ...</p>;
  console.log(data.auth, 11);
  return (
    <>
      {!data.auth && <Redirect to="/Login" />}
      <main>
        <div className="tickets-list">
          <ul>
            <li>
              <div>
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
            <li>
              <div>
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
            <li>
              <div>
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
            <li>
              <div>
                <p>Name of Concert</p>
                <p>date</p>
                <p>status</p>
              </div>
            </li>
            <li>
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
            <p>firstName</p>
            <p>secondName</p>
            <p>Rating</p>
          </div>
        </div>
      </main>
    </>
  );
};
