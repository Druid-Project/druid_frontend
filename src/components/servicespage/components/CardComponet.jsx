import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PropTypes from "prop-types";
import CTAButton from "../../common/CTAButton";

const CardComponent = ({ imageUrl, title, description, ctaButton }) => {
  console.log("CardComponent -> imageUrl", imageUrl);

  return (
    <Card sx={{ display: "flex", maxWidth: "800px", justifyContent:"center", alignItems:"center", borderRadius:"10px" }}>
      {imageUrl && (
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          image={imageUrl}
          alt={title || "Card Image"}
          className="card-image"
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          padding: "10px",
        }}
      >
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
      </Box>

      {ctaButton && (
        <CardActions className="card-actions">
          <CTAButton title={ctaButton.title} url={ctaButton.uri} />
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
