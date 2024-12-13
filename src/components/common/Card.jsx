import React from "react";
import {
  Card as MuiCard,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  ButtonBase,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PropTypes from "prop-types";
import "../../assets/css/cardStyle.css";

const Card = ({
  imageUrl,
  title,
  description,
  ctaButton,
  layout = "vertical",
  reverse = false,
  customStyles = {},
  contentStyles = {},
  imageStyles = {},
  actionsStyles = {},
}) => {
  return (
    <MuiCard
      className={`custom-card ${layout === "horizontal" ? "horizontal" : ""} ${
        reverse ? "reverse" : ""
      }`}
      sx={{
        display: "flex",
        flexDirection: layout === "horizontal" ? "row" : "column",
        alignItems: "center",
        textAlign: layout === "horizontal" ? "left" : "center",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        },
        ...customStyles,
      }}
    >
      {imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={title || "Card Image"}
          className="card-image"
          sx={{
            width: layout === "horizontal" ? "50%" : "100%",
            height: layout === "horizontal" ? "auto" : "200px",
            ...imageStyles,
          }}
        />
      )}
      <CardContent className="card-content" sx={contentStyles}>
        <Typography variant="h5" component="div" className="card-title">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="card-description"
        >
          {description}
        </Typography>
      </CardContent>
      {ctaButton && (
        <CardActions className="card-actions" sx={actionsStyles}>
          {layout === "horizontal" ? (
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
          ) : (
            <Button size="small" href={ctaButton.uri} className="cta-button">
              {ctaButton.title}
              <ArrowForwardIcon className="arrow-icon" />
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  );
};

Card.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctaButton: PropTypes.shape({
    uri: PropTypes.string,
    title: PropTypes.string,
  }),
  layout: PropTypes.oneOf(["vertical", "horizontal"]),
  reverse: PropTypes.bool,
  customStyles: PropTypes.object,
  contentStyles: PropTypes.object,
  imageStyles: PropTypes.object,
  actionsStyles: PropTypes.object,
};

export default Card;
