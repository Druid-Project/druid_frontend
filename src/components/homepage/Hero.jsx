import React from "react";
import { Typography, Box } from "@mui/material";

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <Box>
      <h2>Hero</h2>
      <Typography variant="h3">{data.title}</Typography>
      <Typography variant="body1">{data.field_short_description}</Typography>
    </Box>
  );
};

export default Hero;
