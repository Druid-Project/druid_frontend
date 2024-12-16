import { Box, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";
import CommonCardContent from "./CommonCardContent"; // Import the common content component

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
      <CommonCardContent
        title={title}
        description={description}
        ctaButton={ctaButton}
        containerStyles={{
          position: "relative",
          zIndex: 2,
          padding: "2rem",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          minHeight: "40vh",
          maxWidth: "700px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
        }}
        buttonStyles={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          borderRadius: "30px",
          backgroundColor: "#ffffff9a",
          color: "#333",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "#ddd",
          },
          maxWidth: "200px",
          alignSelf: "center",
        }}
      />
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
