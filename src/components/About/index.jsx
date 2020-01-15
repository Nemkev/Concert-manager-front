import React, { useState, useEffect } from "react";
import axios from "axios";
import openSocket from "socket.io-client";

import "./index.scss";

export const About = () => {
  const [description, setDescription] = useState({});
  const [placeId, setPlaceId] = useState("");
  const [placeSchema, setPlaceSchema] = useState({});
  const [matrix, setLocalMatrix] = useState([]);
  const queryUrl = window.location.href.split("/about/");
  useEffect(() => {
    const socket = openSocket("http://localhost:8080");
    const fetchData = async () => {
      const concertData = await axios.get(
        `http://localhost:8080/about/${queryUrl[1]}`
      );
      setDescription(concertData.data);
      const roomData = await axios.get(
        `http://localhost:8080/place/${concertData.data.concert.roomId}`
      );
      setPlaceSchema(roomData.data.schema.placeSchema);
    };
    fetchData();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const fetchData = async () => {
      const concertData = await axios.get(
        `http://localhost:8080/about/${queryUrl[1]}`
      );
      const updateSchema = await axios.put(
        `http://localhost:8080/current/${concertData.data.concert.roomId}`,
        {
          placeSchema
        }
      );
    };
    fetchData();
  };

  const columns = placeSchema[0] && placeSchema[0].length;

  return (
    <div className="about-overlap">
      <div className="place-schema-booking">
        {placeSchema[0] && (
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              gridTemplateColumns: `repeat(${columns},20px)`
            }}
          >
            {placeSchema.map((rowsArr, i) =>
              rowsArr.map((_, k) => (
                <div
                  key={`${i}-${k}`}
                  onClick={() => {
                    setPlaceId(placeSchema[i][k].id);
                    placeSchema[i][k].booked = true;
                    setPlaceSchema(placeSchema);
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor:
                      placeSchema[i][k] === 0
                        ? "gray"
                        : undefined || placeSchema[i][k].booked === false
                        ? "green"
                        : undefined || placeSchema[i][k].booked === true
                        ? "blue"
                        : undefined,
                    border: "solid 1px black"
                  }}
                />
              ))
            )}
          </div>
        )}
        <button onClick={handleSubmit}>Book this place</button>
      </div>
      <div className="concert-description">
        {description.concert && <p>{description.concert.description}</p>}
      </div>
    </div>
  );
};
