import React from "react";
import {
  Card as MuiCard,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import CTAButton from "./CTAButton";
import "../../assets/css/servicesCard.css";

const Card = ({
  imageUrl,
  description,
  ctaButton,
  layout = "horizontal",
  reverse = false,
  customStyles = {},
  contentStyles = {},
  actionsStyles = {},
  variant = "default", // Add variant prop
}) => {
  const isServicesVariant = variant === "services";
  const isParagraphVariant = variant === "paragraph";

  return (
    <MuiCard
      className={`custom-card ${layout === "horizontal" ? "horizontal" : ""} ${
        reverse ? "reverse" : ""
      } ${isServicesVariant ? "services-card-horizontal" : ""} ${
        isParagraphVariant ? "paragraph-card" : ""
      }`}
      sx={{
        display: "flex",
        flexDirection: layout === "horizontal" ? "row" : "column",
        width: "100%",
        boxShadow: isServicesVariant ? "none" : "0 2px 8px rgba(0,0,0,0.1)",
        backgroundColor: isServicesVariant ? "transparent" : "#fff",
        ...customStyles,
      }}
    >
      {imageUrl && (
        <CardMedia
          component="img"
          image={imageUrl}
          alt="Card image"
          sx={{
            width: layout === "horizontal" ? "50%" : "100%",
            height: layout === "horizontal" ? "auto" : "200px",
          }}
        />
      )}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          position: "relative",
        }}
      >
        <CardContent sx={{ padding: "0 !important", ...contentStyles }}>
          <Typography
            variant="body1"
            color="text.primary"
            className={
              isServicesVariant
                ? "services-card-description"
                : isParagraphVariant
                ? "paragraph-card-description"
                : ""
            }
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
            ...actionsStyles,
          }}
        >
          <CTAButton uri={ctaButton.uri} title={ctaButton.title} />
        </Box>
      )}
    </MuiCard>
  );
};

Card.propTypes = {
  imageUrl: PropTypes.string, // Add imageUrl prop type
  description: PropTypes.string.isRequired,
  ctaButton: PropTypes.shape({
    uri: PropTypes.string,
    title: PropTypes.string,
  }),
  layout: PropTypes.oneOf(["vertical", "horizontal"]),
  reverse: PropTypes.bool,
  customStyles: PropTypes.object,
  contentStyles: PropTypes.object,
  actionsStyles: PropTypes.object,
  variant: PropTypes.string, // Add variant prop type
};

export default Card;
