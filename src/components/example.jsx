import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { AUTH } from "../query/AUTH";
import { PhotoCarousel } from "./PhotoCarousel";
import { useQuery } from "@apollo/react-hooks";

export const Example = () => {
  const { loading, error, data } = useQuery(AUTH);
  if (loading) return <p>Loading ...</p>;
  console.log(data.auth, 11);
  return (
    <>
      {!data.auth && <Redirect to="/Login" />}
      <PhotoCarousel />
    </>
  );
};
