import React, { useEffect, useState } from "react";
import { Typography, Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { fetchCards } from "../../utils/fetchCards";
import ServicesCard from "../common/ServicesCard";
import "./servicesSections.css"; // Import custom CSS

const ServicesSections = ({ section }) => {
  const { baseUrl } = useSelector((state) => state.home);
  const [serviceCards, setServiceCards] = useState([]);

  useEffect(() => {
    const fetchServiceCards = async () => {
      const cards = await fetchCards(
        section,
        baseUrl,
        "field_services_section_cards"
      );
      setServiceCards(cards);
    };

    fetchServiceCards();
  }, [section, baseUrl]);

  return (
    <div className="services-container">
      <Typography variant="h4" gutterBottom className="centered-title">
        {section.attributes.field_title.split(" ").map((word, index) => (
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
