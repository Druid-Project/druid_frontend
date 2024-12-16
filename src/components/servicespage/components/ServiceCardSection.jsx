import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Container, Grid, Typography } from "@mui/material";
import CardComponent from "./CardComponent";
import useFetchCards from "../../../hooks/useFetchCards";

const ServiceCardSection = ({ data }) => {
  const { baseUrl } = useSelector((state) => state.content);
  const servicesSection = data.included?.find(
    (item) => item.type === "paragraph--our_services_section"
  );
  const serviceCards = useFetchCards(servicesSection, "field_services_section_cards");

  if (!servicesSection) return null;

  return (
    <Container
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "50px",
      }}
    >
      <Typography variant="h4" gutterBottom className="centered-title" sx={{padding:"10px"}} >
        {servicesSection.attributes.field_title}
      </Typography>
      <Grid container spacing={3}>
        {serviceCards.map((card, index) => (
          <Grid
            item
            xs={12}
            md={6}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <CardComponent
              imageUrl={card.imageUrl}
              title={card.attributes.field_card_title || "Default Title"}
              description={card.attributes.field_card_description}
              ctaButton={card.attributes.field_card_cta_button}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

ServiceCardSection.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ServiceCardSection;