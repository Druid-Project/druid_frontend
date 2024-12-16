import {
  Card as MuiCard,
  CardMedia,
  Box,
  Typography,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

import "../../assets/css/servicesCard.css";

const Card = ({
  imageUrl,
  description,
  ctaButton,
  layout = "horizontal",
  reverse = false,
  customStyles = {},
  variant = "default",
}) => {
  const isServicesVariant = variant === "services";
  const isCardComponentVariant = variant === "cardComponent";
  const isServiceCardVariant = variant === "servicecard";

  return (
    <MuiCard
      className={`custom-card ${layout === "horizontal" ? "horizontal" : ""} ${
        reverse ? "reverse" : ""
      } ${isServicesVariant ? "services-card-horizontal" : ""} ${
        isServicesVariant && reverse ? "services-card-horizontal.reverse" : ""
      } ${isCardComponentVariant ? "card-component" : ""} ${
        isServiceCardVariant ? "service-card" : ""
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
            width: isCardComponentVariant
              ? "100px"
              : isServiceCardVariant
              ? "80px"
              : layout === "horizontal"
              ? "50%"
              : "100%",
            height: isCardComponentVariant
              ? "100px"
              : isServiceCardVariant
              ? "80px"
              : layout === "horizontal"
              ? "auto"
              : "200px",
            marginBottom: isCardComponentVariant || isServiceCardVariant ? "16px" : "0",
          }}
        />
      )}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: isServiceCardVariant ? "column" : reverse ? "row-reverse" : "row",
          alignItems: "center",
          justifyContent: isServiceCardVariant ? "center" : "space-between",
          padding: "16px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "16px",
          }}
        >
          <Typography
            variant="body1"
            paragraph
            className={isServicesVariant || isServiceCardVariant ? "services-card-description" : ""}
          >
            {description}
          </Typography>
        </Box>
        <Box sx={{ display: "flex",flex:isServicesVariant ? "1": "0"  , justifyContent: "center", marginTop: isServiceCardVariant ? "auto" : "0" }}>
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
