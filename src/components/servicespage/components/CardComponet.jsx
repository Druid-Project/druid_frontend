import React from "react";
import { Card, CardContent, Typography, Box, ButtonBase } from "@mui/material";
import PropTypes from "prop-types";

const CardComponent = ({ imageUrl, title, description, ctaButton }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        },
      }}
    >
      <Box
        component="img"
        src={imageUrl}
        alt={title}
        sx={{
          width: "64px",
          height: "64px",
          marginBottom: "16px",
        }}
      />
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: "8px",
            fontSize: "1.25rem",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: "16px" }}
        >
          {description}
        </Typography>
        {ctaButton && (
          <ButtonBase
            href={ctaButton.uri}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              color: "#0071e3",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {ctaButton.title || "Learn More"}
          </ButtonBase>
        )}
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctaButton: PropTypes.shape({
    uri: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default CardComponent;
