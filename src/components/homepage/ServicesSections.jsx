import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { fetchCards } from "../../utils/fetchCards";

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
    <div>
      <Typography variant="h4" gutterBottom>
        {section.attributes.field_title}
      </Typography>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {serviceCards.map((card, index) => (
          <Card key={index} style={{ width: "300px", marginBottom: "20px" }}>
            {card.imageUrl && (
              <CardMedia
                component="img"
                height="140"
                image={card.imageUrl}
                alt={
                  card.attributes.field_card_image?.data?.meta?.alt ||
                  "Service Image"
                }
              />
            )}
            <CardContent>
              <Typography variant="h5" component="div">
                {card.attributes.field_card_title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.attributes.field_card_description}
              </Typography>
            </CardContent>
            <CardActions>
              {card.attributes.field_card_cta_button && (
                <Button
                  size="small"
                  href={card.attributes.field_card_cta_button.uri}
                >
                  {card.attributes.field_card_cta_button.title}
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesSections;
