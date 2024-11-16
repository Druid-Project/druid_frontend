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
          {hero.shortDescription}
        </Typography>
        <Typography variant="body2">{hero.longDescription}</Typography>
        <Button
          variant="contained"
          color="primary"
          href={hero.buttonLink}
          sx={{ mt: 2 }}
        >
          {hero.buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Hero;
