import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";

const ParagraphCard = ({ paragraphCard }) => {
  return (
    <Container>
      <Box
        sx={{
          margin: "2rem 0",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#333",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          color: "#fff",
        }}
      >
        {/* Title */}
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
          {paragraphCard.attributes.field_card_title}
        </Typography>

        {/* Image */}
        {paragraphCard.imageUrl && (
          <Box
            component="img"
            src={paragraphCard.imageUrl}
            alt={paragraphCard.attributes.field_card_title}
            sx={{
              width: "100%",
              maxWidth: "700px",
              height: "auto",
              borderRadius: "12px",
              border: "2px solid #fff",
              marginBottom: "1rem",
              boxShadow: "0 2px 8px rgba(255, 255, 255, 0.3)",
            }}
          />
        )}

        {/* Description */}
        <Typography
          variant="body1"
          paragraph
          sx={{ textAlign: "center", lineHeight: 1.8 }}
        >
          {paragraphCard.attributes.field_card_description}
        </Typography>

        {/* Call-to-Action Button */}
        {paragraphCard.attributes.field_card_cta_button && (
          <Button
            variant="contained"
            href={paragraphCard.attributes.field_card_cta_button.uri.replace(
              "internal:",
              ""
            )}
            sx={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#333",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#ccc",
              },
            }}
          >
            {paragraphCard.attributes.field_card_cta_button.title || "Learn More"}
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default ParagraphCard;
