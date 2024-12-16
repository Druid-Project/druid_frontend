import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Container, Grid, Typography } from "@mui/material";
import Card from "../../common/Card"; // Import Card component
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
            <Card
              imageUrl={card.imageUrl}
              description={card.attributes.field_card_description}
              ctaButton={card.attributes.field_card_cta_button}
              customStyles={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                },
              }}
              contentStyles={{
                padding: "0 !important",
                textAlign: "center",
              }}
              actionsStyles={{
                padding: "0 !important",
                textAlign: "center",
              }}
              variant="cardComponent" // Use new variant
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