import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import CTAButton from "./CTAButton";
import "./servicesCard.css"; // Import custom CSS

const ServicesCard = ({ description, ctaButton, reverse }) => {
  return (
    <Card
      className={`services-card-horizontal ${reverse ? "reverse" : ""}`}
      sx={{
        display: "flex",
        width: "100%",
        boxShadow: "none",
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          position: "relative", // Ensure pseudo-elements are positioned correctly
        }}
      >
        <CardContent sx={{ padding: "0 !important" }}>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              fontFamily: '"Ruluko", sans-serif',
              fontWeight: 400,
              fontSize: "20px",
              textAlign: "left",
              marginRight: "16px",
              position: "relative",
              padding: "16px",
            }}
            className="services-card-description"
          >
            {description}
          </Typography>
        </CardContent>
      </Box>
      {ctaButton && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <CTAButton uri={ctaButton.uri} title={ctaButton.title} />
        </Box>
      )}
    </Card>
  );
};

ServicesCard.propTypes = {
  description: PropTypes.string.isRequired,
  ctaButton: PropTypes.shape({
    uri: PropTypes.string,
    title: PropTypes.string,
  }),
  reverse: PropTypes.bool,
};

export default ServicesCard;
