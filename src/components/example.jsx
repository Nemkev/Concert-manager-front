import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { PhotoCarousel } from "./PhotoCarousel";

const GET_BUILDINGS = gql`
  {
    getBuildings {
      name
      city
      id
      concerts {
        date
        id
        name
      }
    }
  }
`;

export const Example = () => {
  const [count, setCount] = useState(0);

  const { loading, error, data } = useQuery(GET_BUILDINGS);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);
  return (
    // <div>
    //   <p>You click counter is {count} </p>
    //   <button onClick={() => setCount(count + 1)}>Click on me</button>
    // </div>
    <PhotoCarousel />
  );
};
