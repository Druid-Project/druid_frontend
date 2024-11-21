// src/components/homepage/Hero.jsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux"; // Import useSelector

const Hero = ({ hero }) => {
  // Fetch the baseUrl from the Redux state
  const { baseUrl } = useSelector((state) => state.home);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '60vh',
        backgroundImage: `url(${baseUrl}${hero.image.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />
      <CardContent sx={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          {hero.attributes.field_short_description}
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          {hero.attributes.field_long_description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href={hero.attributes.field_cta_button?.uri || "#"}
          sx={{ padding: '10px 20px', fontSize: '16px' }}
        >
          {hero.attributes.field_cta_button?.title || "Learn More"}
        </Button>
      </CardContent>
    </Box>
  );
};

export default Hero;
