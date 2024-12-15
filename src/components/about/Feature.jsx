import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Typography, Box, Card, CardMedia, CardContent } from "@mui/material";
import CardComponent from "../common/Card";
import useFetchCards from "../../hooks/useFetchCards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Card from "../common/Card";

const Feature = ({ data }) => {
  const { baseUrl } = useSelector((state) => state.content);
  const featureSection = data.included?.find(
    (item) => item.type === "paragraph--feature_section"
  );
  const featureCards = useFetchCards(featureSection, "field_feature_list");
  const sliderRef = useRef(null);

  if (!featureSection) return null;

  return (
    <Box className="feature-container">
      <Typography variant="h4" className="text-center p-2" gutterBottom>
        {featureSection.attributes.field_title}
      </Typography>
      {featureCards.map((card, index) => (
        <Box key={index} className="slider-item">
          {/* <Card
            imageUrl={card.imageUrl}
            title={card.attributes.field_card_title}
            description={card.attributes.field_card_description}
            ctaButton={card.attributes.field_card_cta_button}
          /> */}
          <Card>
            <CardMedia title="" image={card.imageUrl} />
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {card.attributes.field_card_title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {card.attributes.field_card_description}
                </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default Feature;
