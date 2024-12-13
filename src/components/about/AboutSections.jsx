import React from "react";
import { Box, Typography } from "@mui/material";
import ServiceCardSection from "../servicespage/components/ServiceCardSection";
import ConnectCard from "../servicespage/components/ConnectCard";

const AboutSections = ({ data }) => {
  const sections = data?.included?.filter(
    (item) =>
      item.type === "paragraph--our_services_section" ||
      item.type === "paragraph--card" ||
      item.type === "paragraph--connect_with_us"
  );

  return (
    <Box>
      {sections.map((section) => {
        switch (section.type) {
          case "paragraph--our_services_section":
            return (
              <Box key={section.id}>
                <Typography variant="h4">{section.attributes.field_title}</Typography>
                <ServiceCardSection data={section} />
              </Box>
            );
          case "paragraph--card":
            return (
              <Box key={section.id}>
                <Typography variant="h5">{section.attributes.field_card_title}</Typography>
                <Typography>{section.attributes.field_card_description}</Typography>
              </Box>
            );
          case "paragraph--connect_with_us":
            return (
              <Box key={section.id}>
                <ConnectCard data={section} />
              </Box>
            );
          default:
            return null;
        }
      })}
    </Box>
  );
};

export default AboutSections;
