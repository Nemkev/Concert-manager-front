import React, { useState, useEffect } from "react";
import axios from "axios";

import "./index.scss";

export const About = () => {
  const [description, setDescription] = useState({});
  const [placeSchema, setPlaceSchema] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:8080/about")
      .then(res => {
        const description = res.data;
        setDescription(description);
      })
      .catch(console.log);
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/place/:roomId")
      .then(res => {
        const placeSchema = res.data;
        setPlaceSchema(placeSchema);
      })
      .catch(console.log);
  }, []);
  console.log(description);
  return (
    <div className="about-overlap">
      <div className="place-schema-booking">
        <p>Place Schema</p>
      </div>
      <div className="concert-description">
        {description.concert && <p>{description.concert[33].description}</p>}
      </div>
    </div>
  );
};
