import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PropTypes from "prop-types";

const CardComponent = ({ imageUrl, title, description, ctaButton }) => {
  console.log("CardComponent -> imageUrl", imageUrl);
  
  return (
    <Card className="custom-card">
      {imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={title || "Card Image"}
          className="card-image"
        />
      )}
      <CardContent className="card-content">
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
        <CardActions className="card-actions">
          <Button size="small" href={ctaButton.uri} className="cta-button">
            {ctaButton.title}
            <ArrowForwardIcon className="arrow-icon" />
          </Button>
        </CardActions>
      )}
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
