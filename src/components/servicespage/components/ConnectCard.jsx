import React from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import CTAButton from "../../common/CTAButton";
import useFetchCardDetails from "../../../hooks/useFetchCardDetails";

const ConnectCard = ({ data }) => {
  const connectSection = data.included?.find(
    (item) => item.type === "paragraph--connect_with_us"
  );
  const connectCardId = connectSection?.relationships.field_connect_card.data.id;
  const connectCard = useFetchCardDetails(connectCardId);

  if (!connectCard) return null;

  const descriptionLines = connectCard.attributes.field_card_description.split("\n");
  const email = descriptionLines[3]?.trim();
  const phone = descriptionLines[4]?.trim();

  return (
    <Container sx={{ padding: "2rem 0", textAlign: "center" }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
            {connectCard.attributes.field_card_title}
          </Typography>
        </Grid>
        {descriptionLines.slice(0, 3).map((line, index) => (
          <Grid item xs={12} key={index}>
            <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
              {line}
            </Typography>
          </Grid>
        ))}
        {email && (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
              <strong>Email: </strong>
              <a href={`mailto:${email}`} style={{ color: "#0071e3", textDecoration: "none" }}>
                {email}
              </a>
            </Typography>
          </Grid>
        )}
        {phone && (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
              <strong>Phone: </strong>
              <a href={`tel:${phone}`} style={{ color: "#0071e3", textDecoration: "none" }}>
                {phone}
              </a>
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <CTAButton
            uri="#"
            title={connectCard.attributes.field_card_cta_button.title || "Learn More"}
            sx={{
              marginTop: "1.5rem",
              backgroundColor: "#0071e3",
              color: "#FFF",
              "&:hover": { backgroundColor: "#005bb5" },
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConnectCard;
