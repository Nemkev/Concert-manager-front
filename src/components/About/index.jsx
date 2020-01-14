import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import produce from "immer";
import openSocket from "socket.io-client";

import "./index.scss";

export const About = () => {
  const socket = openSocket("http://localhost:8080");
  const [description, setDescription] = useState({});
  const [placeSchema, setPlaceSchema] = useState({});
  const queryUrl = window.location.href.split("/about/");
  useEffect(() => {
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
    placeSchema.schema && placeSchema.schema.rooms[0].placeSchema.length;
  const rows =
    placeSchema.schema && placeSchema.schema.rooms[0].placeSchema[0].length;

  const handleGrid = useCallback(() => {
    const arr = placeSchema.schema && Array(Number(columns)).fill(0);
    const rowsArr = [];
    for (let i = 0; i < rows; i++) {
      rowsArr.push(arr);
    }
    return rowsArr;
  }, [columns, rows]);

  const [grid, setGrid] = useState(handleGrid);

  useEffect(() => {
    setGrid(handleGrid);
  }, [handleGrid]);

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
            {grid.map((rowsArr, i) =>
              rowsArr.map((_, k) => (
                <div
                  key={`${i}-${k}`}
                  onClick={() => {
                    const newGrid = produce(grid, gridCopy => {
                      gridCopy[i][k] = grid[i][k] ? 0 : 1;
                    });
                    setGrid(newGrid);
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor:
                      grid[i][k] === 1
                        ? "green"
                        : undefined || grid[i][k] === 2
                        ? "red"
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
