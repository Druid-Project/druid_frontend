import {
  Card as MuiCard,
  CardMedia,
  Box,
  Typography,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import CommonCardContent from "./CommonCardContent"; // Import the common content component
import "../../assets/css/servicesCard.css";

const Card = ({
  imageUrl,
  description,
  ctaButton,
  layout = "horizontal",
  reverse = false,
  customStyles = {},
  contentStyles = {},
  variant = "default",
}) => {
  const isServicesVariant = variant === "services";
  const isCardComponentVariant = variant === "cardComponent";

  return (
    <MuiCard
      className={`custom-card ${layout === "horizontal" ? "horizontal" : ""} ${
        reverse ? "reverse" : ""
      } ${isServicesVariant ? "services-card-horizontal" : ""} ${
        isServicesVariant && reverse ? "services-card-horizontal.reverse" : ""
      } ${isCardComponentVariant ? "card-component" : ""}`}
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
            width: isCardComponentVariant
              ? "100px"
              : layout === "horizontal"
              ? "50%"
              : "100%",
            height: isCardComponentVariant
              ? "100px"
              : layout === "horizontal"
              ? "auto"
              : "200px",
            marginBottom: isCardComponentVariant ? "16px" : "0",
          }}
        />
      )}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: reverse ? "row-reverse" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            flex: 1,
            paddingRight: reverse ? "0" : "16px",
            paddingLeft: reverse ? "16px" : "0",
          }}
        >
          <Typography
            variant="body1"
            paragraph
            className={isServicesVariant ? "services-card-description" : ""}
          >
            {description}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          {ctaButton && (
            <Button
              variant="contained"
              href={ctaButton.uri.replace("internal:", "")}
              sx={{
                marginTop: "1rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "30px",
                backgroundColor: "#ffffffa8",
                color: "#333",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "#ddd",
                },
                maxWidth: "200px",
                alignSelf: "center",
              }}
            >
              {ctaButton.title || "Learn More"}
            </Button>
          )}
        </Box>
      </Box>
    </MuiCard>
  );
};

Card.propTypes = {
  imageUrl: PropTypes.string,
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
  variant: PropTypes.string,
};

export default Card;
