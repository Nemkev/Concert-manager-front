import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./index.scss";
import ConcertOne from "../../assets/6.jpg";
import ConcertTwo from "../../assets/7.jpeg";
import ConcertThree from "../../assets/8.jpeg";

const content = [
  {
    title: "Lorem ipsum",
    description: "dollor sir ammet",
    image: `${ConcertOne}`
  },
  { title: "Curriculum", description: "Vitae", image: `${ConcertTwo}` },
  {
    title: "Concert",
    description: "Show must go on",
    image: `${ConcertThree}`
  }
];

export const PhotoCarousel = () => {
  return (
    <main className="slider">
      <Slider
        autoplay={3000}
        previousButton={false}
        nextButton={false}
        infinite
      >
        {content.map((article, index) => (
          <div
            className="slide"
            key={index}
            style={{
              background: `url('${article.image}') no-repeat center center`,
              //
              width: `100vw`,
              height: `100vh`,
              objectFit: `cover`
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
