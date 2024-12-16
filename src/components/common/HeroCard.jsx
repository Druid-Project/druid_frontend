import React from "react";
import { Box, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";

const HeroCard = ({ title, description, ctaButton, imageUrl }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
      }}
    >
      {/* Background Blur */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          padding: "2rem",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          minHeight: "30vh",
          maxWidth: "700px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" paragraph>
          {description}
        </Typography>
        {ctaButton && (
          <Button
            variant="contained"
            href={ctaButton.uri.replace("internal:", "")}
            sx={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "30px",
              backgroundColor: "#fff",
              color: "#333",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#ddd",
              },
            }}
          >
            {ctaButton.title || "Learn More"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

HeroCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctaButton: PropTypes.shape({
    uri: PropTypes.string,
    title: PropTypes.string,
  }),
  imageUrl: PropTypes.string.isRequired,
};

export default HeroCard;
