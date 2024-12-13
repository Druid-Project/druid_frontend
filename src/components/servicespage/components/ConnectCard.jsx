import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Grid, Button } from "@mui/material";
import CTAButton from "../../common/CTAButton";
import useFetchCardDetails from "../../../hooks/useFetchCardDetails";

const ConnectCard = ({ data }) => {
  const { baseUrl } = useSelector((state) => state.content);
  const navigate = useNavigate();
  const connectSection = data.included?.find(
    (item) => item.type === "paragraph--connect_with_us"
  );
  const connectCardId = connectSection?.relationships.field_connect_card.data.id;
  const connectCard = useFetchCardDetails(connectCardId, baseUrl);

  if (!connectCard) return null;

  const handleButtonClick = (event) => {
    event.preventDefault();
    const uri = connectCard.attributes.field_card_cta_button.uri.replace(
      "internal:",
      ""
    );
    navigate(uri);
  };

  // Parse description into lines and specific fields
  const descriptionLines = [
    connectCard.attributes.field_card_description.split("\n")[0], // Address line 1
    connectCard.attributes.field_card_description.split("\n")[1], // Address line 2
    connectCard.attributes.field_card_description.split("\n")[2], // Country
  ];

  const email = connectCard.attributes.field_card_description
    .split("\n")[3]
    ?.trim();

  const phone = connectCard.attributes.field_card_description
    .split("\n")[4]
    ?.trim();

  return (
    <Container sx={{ padding: "2rem 0" }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          {connectCard.imageUrl && (
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              src={connectCard.imageUrl}
              alt={connectCard.attributes.field_card_title}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box sx={{ padding: { xs: "1rem", md: "2rem" } }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "text.primary",
                fontSize: { xs: "1.8rem", md: "2.2rem" },
              }}
            >
              {connectCard.attributes.field_card_title}
            </Typography>

            {descriptionLines.map((line, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  marginBottom: "0.5rem",
                  lineHeight: "1.6",
                  fontSize: "1rem",
                  color: "text.secondary",
                }}
              >
                {line}
              </Typography>
            ))}

            {/* Email */}
            {email && (
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "0.5rem",
                  lineHeight: "1.6",
                  fontSize: "1rem",
                  color: "text.secondary",
                }}
              >
                <strong>Email: </strong>
                <a href={`mailto:${email}`} style={{ color: "#0071e3" }}>
                  {email}
                </a>
              </Typography>
            )}

            {/* Phone */}
            {phone && (
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "0.5rem",
                  lineHeight: "1.6",
                  fontSize: "1rem",
                  color: "text.secondary",
                }}
              >
                <strong>Phone: </strong>
                <a href={`tel:${phone}`} style={{ color: "#0071e3" }}>
                  {phone}
                </a>
              </Typography>
            )}

            <CTAButton
              uri="#"
              title={
                connectCard.attributes.field_card_cta_button.title ||
                "Learn More"
              }
              onClick={handleButtonClick}
              sx={{
                marginTop: "2rem",
                fontSize: "1rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "50px",
                backgroundColor: "#0071e3",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#005bb5",
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConnectCard;
