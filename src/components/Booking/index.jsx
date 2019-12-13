import React, { useState } from "react";
import produce from "immer";

import "./index.scss";

const numRows = 20;
const numCols = 20;

export const Booking = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: `repeat(${numCols},20px)`
      }}
    >
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          <div
            key={`${i}-${k}`}
            onClick={() => {
              const newGrid = produce(grid, gridCopy => {
                gridCopy[i][k] = grid[i][k] ? 0 : 1;
              });
              setGrid(newGrid);
            }}
            className="grid-column"
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[i][k] ? "green" : undefined,
              border: "solid 1px black"
            }}
          ></div>
        ))
      )}
    </div>
  );
};
