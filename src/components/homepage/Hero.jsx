// src/components/homepage/Hero.jsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux"; // Import useSelector

const Hero = ({ hero }) => {
  // Fetch the baseUrl from the Redux state
  const { baseUrl } = useSelector((state) => state.home);

  console.log("Rendering Hero component with hero:", hero);

  return (
    <Card>
      {hero.image && (
        <CardMedia
          component="img"
          image={`${baseUrl}${hero.image.url}`} // Dynamic image URL from Redux state
          alt={hero.image.alt}
        />
      )}
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {hero.attributes.field_short_description}
        </Typography>
        <Typography variant="body2">
          {hero.attributes.field_long_description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href={hero.attributes.field_cta_button?.uri || "#"}
          sx={{ mt: 2 }}
        >
          {hero.attributes.field_cta_button?.title || "Learn More"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Hero;
