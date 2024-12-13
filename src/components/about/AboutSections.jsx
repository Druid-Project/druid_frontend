import React from "react";
import { Box, Typography, Card, CardMedia, CardContent, Grid } from "@mui/material";

const AboutSections = ({ data }) => {
  const { data: sections, included } = data;

  // Helper function to get included entity by ID
  const getIncludedEntity = (id) => included.find((item) => item.id === id);

  // Filter the "about" sections
  const aboutSections = sections.filter(
    (section) => section.type === "paragraph--about_page_section"
  );

  return (
    <Box>
      {aboutSections.map((section) => {
        const sectionContent = getIncludedEntity(section.id);
        const sectionTitle = sectionContent.attributes.title || "Untitled Section";

        // Fetch cards if available
        const cards =
          sectionContent.relationships.field_services_section_cards?.data?.map((cardRef) =>
            getIncludedEntity(cardRef.id)
          ) || [];

        return (
          <Box key={section.id} sx={{ marginBottom: 6 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              {sectionTitle}
            </Typography>
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item xs={12} sm={6} md={4} key={card.id}>
                  <Card>
                    {card.relationships.field_card_image?.data && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={
                          getIncludedEntity(card.relationships.field_card_image.data.id).attributes.uri.url
                        }
                        alt={card.attributes.title}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6">{card.attributes.title}</Typography>
                      <Typography variant="body2">{card.attributes.body?.value}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

export default AboutSections;
