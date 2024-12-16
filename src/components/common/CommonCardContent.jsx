import React from "react";
import { Box, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";

const CommonCardContent = ({ title, description, ctaButton, containerStyles, buttonStyles }) => {
  return (
    <Box sx={containerStyles}>
      {title && (
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      )}
      <Typography variant="body1" paragraph sx={{ flexGrow: 1 }}>
        {description}
      </Typography>
      {ctaButton && (
        <Button
          variant="contained"
          href={ctaButton.uri.replace("internal:", "")}
          sx={buttonStyles}
        >
          {ctaButton.title || "Learn More"}
        </Button>
      )}
    </Box>
  );
};

CommonCardContent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  ctaButton: PropTypes.shape({
    uri: PropTypes.string,
    title: PropTypes.string,
  }),
  containerStyles: PropTypes.object,
  buttonStyles: PropTypes.object,
};

export default CommonCardContent;
