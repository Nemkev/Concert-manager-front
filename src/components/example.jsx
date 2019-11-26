import React from "react";

import { AUTH } from "../query/AUTH";
import { PhotoCarousel } from "./PhotoCarousel";
import { useQuery } from "@apollo/react-hooks";

export const Example = () => {
  const { data } = useQuery(AUTH);
  console.log(data);
  return <PhotoCarousel />;
};
