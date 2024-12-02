import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Grid, Button } from "@mui/material";
import { fetchCardDetails } from "../../../utils/fetchCards";
import CTAButton from "../../common/CTAButton";

const ConnectCard = ({ data }) => {
  const [connectCard, setConnectCard] = useState(null);
  const { baseUrl } = useSelector((state) => state.content);
  const navigate = useNavigate();

  useEffect(() => {
    const connectSection = data.included?.find(
      (item) => item.type === "paragraph--connect_with_us"
    );
    if (!connectSection) return;
    const connectCardId =
      connectSection.relationships.field_connect_card.data.id;

    const fetchCard = async () => {
      const card = await fetchCardDetails(connectCardId, baseUrl);
      setConnectCard(card);
    };

    fetchCard();
  }, [data, baseUrl]);

  if (!connectCard) return null;

  const handleButtonClick = (event) => {
    event.preventDefault();
    const uri = connectCard.attributes.field_card_cta_button.uri.replace(
      "internal:",
      ""
    );
    navigate(uri);
  };

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
            <Typography variant="h4" gutterBottom>
              {connectCard.attributes.field_card_title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "1.5rem" }}>
              {connectCard.attributes.field_card_description}
            </Typography>
            <CTAButton
              uri="#"
              title={
                connectCard.attributes.field_card_cta_button.title ||
                "Learn More"
              }
              onClick={handleButtonClick}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConnectCard;
