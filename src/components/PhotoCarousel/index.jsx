import React from "react";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "react-awesome-slider/src/styled/fold-out-animation";
import "./index.scss";
import ConcertOne from "../../assets/1.jpeg";
import ConcertTwo from "../../assets/2.jpeg";
import withAutoplay from "react-awesome-slider/dist/autoplay";

const AutoplaySlider = withAutoplay(AwesomeSlider);

export const PhotoCarousel = () => {
  return (
    <main>
      <AutoplaySlider
        cssModule={AwesomeSliderStyles}
        play
        cancelOnInteraction={false}
        interval={6000}
        organicArrows={false}
        bullets={false}
      >
        <div data-src={ConcertOne} alt="image"></div>
        <div data-src={ConcertTwo} alt="image" />
      </AutoplaySlider>
    </main>
  );
};
