import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux"; // Import useSelector

const ServicesSections = ({ section }) => {
  // Fetch the baseUrl from the Redux state
  const { baseUrl } = useSelector((state) => state.home);
  const [blogCards, setBlogCards] = useState([]);

  useEffect(() => {
    // Function to fetch card details by ID
    const fetchCardDetails = async (cardId) => {
      const response = await fetch(
        `${baseUrl}/jsonapi/paragraph/card/${cardId}`
      );
      const data = await response.json();
      return data.data.attributes;
    };

    // Populate blogCards with full details
    const fetchBlogCards = async () => {
      if (section.relationships && section.relationships.field_blog_cards) {
        const cardDetailsPromises =
          section.relationships.field_blog_cards.data.map((card) =>
            fetchCardDetails(card.id)
          );
        const cardDetails = await Promise.all(cardDetailsPromises);
        setBlogCards(cardDetails);
      }
    };

    fetchBlogCards();
  }, [section, baseUrl]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {section.attributes.field_section_titile} {/* Typo is okay */}
      </Typography>
      {blogCards && blogCards.length > 0 ? (
        blogCards.map((card, index) => (
          <Card key={index} style={{ marginBottom: "20px" }}>
            {card?.field_image && (
              <CardMedia
                component="img"
                image={`${baseUrl}${card.field_image.url}`} // Dynamic image URL from Redux state
                alt={card.field_image.alt}
              />
            )}
            <CardContent>
              <Typography variant="body2">
                {card?.field_long_description ||
                  "No long description available"}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href={card?.field_cta_button?.uri || "#"}
                sx={{ mt: 2 }}
              >
                {card?.field_cta_button?.title || "Read more"}
              </Button>
              {card?.nestedParagraphs?.map((nested, nestedIndex) => (
                <div key={nestedIndex}>
                  <Typography variant="h6">
                    {nested?.field_title || "No title available"}
                  </Typography>
                  <Typography variant="body2">
                    {nested?.field_description || "No description available"}
                  </Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body2">No cards available</Typography>
      )}
    </div>
  );
};

export default ServicesSections;
