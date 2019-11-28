import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./index.scss";
import ConcertOne from "../../assets/6.jpg";
import ConcertTwo from "../../assets/7.jpeg";
import ConcertThree from "../../assets/8.jpeg";

const content = [
  {
    title: "Electric eye",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: `${ConcertOne}`
  },
  {
    title: "Curriculum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: `${ConcertTwo}`
  },
  {
    title: "Concert",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: `${ConcertThree}`
  }
];

export const PhotoCarousel = () => {
  return (
    <main className="slider">
      <Slider
        autoplay={60000}
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
              width: `100vw`,
              height: `100vh`,
              objectFit: `cover`
            }}
          >
            <div className="concert-info-wrapper">
              <h2 className="article">{article.title}</h2>
              <div className="description">{article.description}</div>

              <div className="concert-button">
                <p className="button-decoration">About</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </main>
  );
};
