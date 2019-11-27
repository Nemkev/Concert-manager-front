import React from "react";

import UserImage from "../../assets/4.jpg";
import "./index.scss";

export const User = () => {
  return (
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
  );
};
