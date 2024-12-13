import React from "react";
import { Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ServicesCard from "../../common/ServicesCard";
import useFetchCards from "../../../hooks/useFetchCards";
import "../css/servicesSections.css";

const ServicesSections = ({ data }) => {
  const { baseUrl } = useSelector((state) => state.content);
  const servicesSection = data.included?.find(
    (item) => item.type === "paragraph--our_services_section"
  );
  const serviceCards = useFetchCards(servicesSection, baseUrl, "field_services_section_cards");

  if (!servicesSection) return null;

  return (
    <div className="services-container">
      <Typography variant="h4" gutterBottom className="centered-title">
        {servicesSection.attributes.field_title
          .split(" ")
          .map((word, index) => (
            <span key={index} className={word === "OPEN" ? "highlight" : ""}>
              {word}{" "}
            </span>
          ))}
      </Typography>
      <Grid container spacing={3}>
        {serviceCards.map((card, index) => (
          <Grid item xs={12} key={index}>
            <ServicesCard
              description={card.attributes.field_card_description}
              ctaButton={card.attributes.field_card_cta_button}
              reverse={index % 2 !== 0} // Reverse layout for every second card
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ServicesSections;
