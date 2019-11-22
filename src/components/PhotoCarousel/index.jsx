import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./index.scss";
import ConcertOne from "../../assets/1.jpeg";
import ConcertTwo from "../../assets/2.jpeg";

// import Lettering from "react-awesome-slider/src/hoc/animated-lettering";

const content = [
  {
    title: "Lorem ipsum",
    description: "dollor sir ammet",
    image: `${ConcertOne}`
  },
  { title: "Curriculum", description: "Vitae", image: `${ConcertTwo}` }
];

export const PhotoCarousel = () => {
  return (
    <main>
      <Slider>
        {content.map((article, index) => (
          <div
            className="slide"
            key={index}
            style={{
              background: `url('${article.image}')no-repeat center center`,
              width: "100%"
            }}
          >
            <h2>{article.title}</h2>

            <div>{article.description}</div>
          </div>
        ))}
      </Slider>
    </main>
  );
};
