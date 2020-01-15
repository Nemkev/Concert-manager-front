import React, { useState, useEffect } from "react";
import axios from "axios";
import openSocket from "socket.io-client";

import "./index.scss";

export const About = () => {
  const [description, setDescription] = useState({});
  const [placeId, setPlaceId] = useState("");
  const [placeSchema, setPlaceSchema] = useState({});
  const [test, setTest] = useState();
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
      // const updateSchema = await axios({
      //   method: "put",
      //   url: `http://localhost:8080/current/${concertData.data.concert.roomId}`,
      //   data: {
      //     placeSchema: [
      //       [1, 1, 1, 1, 1],
      //       [0, 1, 1, 1, 0],
      //       [1, 1, 1, 1, 1]
      //     ]
      //   }
      // });
      const updateSchema = await axios.put(
        `http://localhost:8080/current/${concertData.data.concert.roomId}`,
        {
          placeSchema: [
            [{}, {}, {}, {}, {}],
            [0, {}, {}, {}, 0],
            [{}, {}, {}, {}, {}]
          ]
        }
      );
      setTest(updateSchema);
    };
    fetchData();
  }, []);

  const columns =
    placeSchema.schema && placeSchema.schema.placeSchema[0].length;

  console.log(placeSchema && placeSchema, 11);

  console.log(test);

  const bookingPlaces =
    placeSchema.schema &&
    placeSchema.schema.placeSchema.map(item => {
      return item.filter(place => {
        return place.booked === false;
      });
    });

  // console.log(bookingPlaces);
  // console.log(placeId);

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
            {placeSchema.schema.placeSchema.map((rowsArr, i) =>
              rowsArr.map((_, k) => (
                <div
                  key={`${i}-${k}`}
                  onClick={() => {
                    setPlaceId(placeSchema.schema.placeSchema[i][k].id);
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor:
                      placeSchema.schema.placeSchema[i][k] === 0
                        ? "gray"
                        : undefined ||
                          placeSchema.schema.placeSchema[i][k] !== 0
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
