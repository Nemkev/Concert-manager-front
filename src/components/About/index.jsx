import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import openSocket from "socket.io-client";

import "./index.scss";

export const About = () => {
  const [description, setDescription] = useState({});
  const [placeId, setPlaceId] = useState("");
  const [placeSchema, setPlaceSchema] = useState({});
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
      setPlaceSchema(roomData.data);
    };
    fetchData();
  }, []);

  const columns =
    placeSchema.schema && placeSchema.schema.rooms[0].placeSchema[0].length;

  console.log(
    placeSchema.schema && placeSchema.schema.rooms[0].placeSchema,
    11
  );

  const bookingPlaces =
    placeSchema.schema &&
    placeSchema.schema.rooms[0].placeSchema.map(item => {
      return item.filter(place => {
        return place.booked === false;
      });
    });

  console.log(bookingPlaces);
  console.log(placeId);

  return (
    <div className="about-overlap">
      <div className="place-schema-booking">
        {placeSchema.schema && (
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              gridTemplateColumns: `repeat(${columns},20px)`
            }}
          >
            {placeSchema.schema.rooms[0].placeSchema.map((rowsArr, i) =>
              rowsArr.map((_, k) => (
                <div
                  key={`${i}-${k}`}
                  onClick={() => {
                    setPlaceId(
                      placeSchema.schema.rooms[0].placeSchema[i][k].id
                    );
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor:
                      placeSchema.schema.rooms[0].placeSchema[i][k] === 0
                        ? "gray"
                        : undefined ||
                          placeSchema.schema.rooms[0].placeSchema[i][k] !== 0
                        ? "green"
                        : undefined,
                    border: "solid 1px black"
                  }}
                />
              ))
            )}
          </div>
        )}
      </div>
      <div className="concert-description">
        {description.concert && <p>{description.concert.description}</p>}
      </div>
    </div>
  );
};
