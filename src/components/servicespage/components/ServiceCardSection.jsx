import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCards } from "../../../utils/fetchCards";
import { Container, Grid, Typography } from "@mui/material";
import CardComponent from "./CardComponet";

const ServiceCardSection = ({ data }) => {
  const { baseUrl } = useSelector((state) => state.content);
  const [serviceCards, setServiceCards] = useState([]);

  useEffect(() => {
    const servicesSection = data.included?.find(
      (item) => item.type === "paragraph--our_services_section"
    );
    if (servicesSection) {
      const fetchServiceCards = async () => {
        const cards = await fetchCards(
          servicesSection,
          baseUrl,
          "field_services_section_cards"
        );
        setServiceCards(cards);
      };
      fetchServiceCards();
    }
  }, [data, baseUrl]);

  const servicesSection = data.included?.find(
    (item) => item.type === "paragraph--our_services_section"
  );

  if (!servicesSection) return null;

  return (
    <Container
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingBottom: "50px",
      }}
    >
      <Typography variant="h4" gutterBottom className="centered-title">
        {servicesSection.attributes.field_title}
      </Typography>
      <Grid container spacing={3}>
        {serviceCards.map((card, index) => (
          <Grid
            item
            xs={12}
            md={12}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              padding: "10px",
            }}
          >
            <CardComponent
              imageUrl={card.imageUrl}
              title={card.attributes.field_card_title}
              description={card.attributes.field_card_description}
              ctaButton={card.attributes.field_card_cta_button}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ServiceCardSection;
