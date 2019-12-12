import React from "react";
import { Redirect } from "react-router-dom";

import { AUTH } from "../../query/AUTH";
import { PhotoCarousel } from "../PhotoCarousel";
import { useQuery } from "@apollo/react-hooks";

import "./index.scss";

export const Home = () => {
  const { loading, error, data } = useQuery(AUTH);
  if (loading) return <p>Loading ...</p>;
  return (
    <div className="overlap">
      {!data.auth && <Redirect to="/login" />}
      <PhotoCarousel />
    </div>
  );
};
