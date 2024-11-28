import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import Slider from "react-slick";
import { fetchCards } from "../../utils/fetchCards";
import CardComponent from "../common/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./feature.css"; // Import custom CSS

const Feature = ({ section }) => {
  const { baseUrl } = useSelector((state) => state.home);
  const [featureCards, setFeatureCards] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchFeatureCards = async () => {
      const cards = await fetchCards(section, baseUrl, "field_feature_list");
      setFeatureCards(cards);
    };

    fetchFeatureCards();
  }, [section, baseUrl]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY < 0) {
        sliderRef.current.slickPrev();
      } else {
        sliderRef.current.slickNext();
      }
    };

    const sliderContainer = document.querySelector(".feature-container");
    sliderContainer.addEventListener("wheel", handleWheel);

    return () => {
      sliderContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true, // Enable swipe to slide
    touchMove: true, // Enable touch move
    autoplay: false, // Disable automatic scrolling
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="feature-container">
      <Typography variant="h4" className="text-center p-2" gutterBottom>
        {section.attributes.field_titile}
      </Typography>
      <Slider {...settings} className="custom-slider" ref={sliderRef}>
        {featureCards.map((card, index) => (
          <Box key={index} className="slider-item">
            <CardComponent
              imageUrl={card.imageUrl}
              title={card.attributes.field_card_title}
              description={card.attributes.field_card_description}
              ctaButton={card.attributes.field_card_cta_button}
            />
          </Box>
        ))}
      </Slider>
    </div>
  );
};

export default Feature;
