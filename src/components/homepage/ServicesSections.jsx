import React from "react";
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

  console.log("Rendering ServicesSections component with section:", section);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {section.attributes.field_section_titile}
      </Typography>
      {section.blogCards.map((card, index) => (
        <Card key={index} style={{ marginBottom: "20px" }}>
          {card?.field_image && (
            <CardMedia
              component="img"
              image={`${baseUrl}${card.field_image.url}`} // Dynamic image URL from Redux state
              alt={card.field_image.alt}
            />
          )}
          <CardContent>
            <Typography variant="h5">
              {card?.field_short_description ||
                "No short description available"}
            </Typography>
            <Typography variant="body2">
              {card?.field_long_description || "No long description available"}
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
      ))}
    </div>
  );
};

export default ServicesSections;
