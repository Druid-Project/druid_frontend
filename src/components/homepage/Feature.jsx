import React from "react";
import { useSelector } from "react-redux";
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";

const Feature = ({ section }) => {
  const { baseUrl } = useSelector((state) => state.home);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {section.attributes.field_section_titile}
      </Typography>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {section.featureCards.map(
          (card, index) =>
            card && (
              <Card key={index} style={{ width: "300px", marginBottom: "20px" }}>
                {card.field_image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${baseUrl}${card.field_image.url}`} // Dynamic image URL from Redux state
                    alt={card.field_image.alt}
                  />
                )}
                <CardContent>
                  <Typography variant="h5" component="div">
                    {card.field_title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.field_short_description}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {card.field_long_description}
                  </Typography>
                </CardContent>
                <CardActions>
                  {card.field_cta_button && (
                    <Button size="small" href={card.field_cta_button.uri}>
                      {card.field_cta_button.title}
                    </Button>
                  )}
                </CardActions>
              </Card>
            )
        )}
      </div>
    </div>
  );
};

export default Feature;
