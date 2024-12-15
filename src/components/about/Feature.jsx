import { useSelector } from "react-redux";
import { Typography, Box, Card, CardMedia, CardContent } from "@mui/material";
import useFetchCards from "../../hooks/useFetchCards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Feature = ({ data }) => {
  const { baseUrl } = useSelector((state) => state.content);
  const featureSection = data.included?.find(
    (item) => item.type === "paragraph--feature_section"
  );
  const featureCards = useFetchCards(featureSection, "field_feature_list");

  if (!featureSection) return null;

  return (
    <Box
      sx={{
        position: "relative",
        padding: "4rem 2rem",
        backgroundColor: "#fefefe",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#1d1d1f",
          fontWeight: "bold",
          marginBottom: "3rem",
        }}
      >
        {featureSection.attributes.field_titile}
      </Typography>
      {featureCards.map((card, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: index % 2 === 0 ? "row" : "row-reverse",
            },
            alignItems: "center",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: "200px",
              borderRadius: "12px",
              backgroundColor: "#ffoooo",
              backgroundImage: `url(${baseUrl}${card.attributes.field_card_image?.uri.url || 'Not found'})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#1d1d1f", textAlign: "center" }}
            >
              {card.attributes.field_card_title}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              flex: 1,
              color: "#6e6e73",
              fontSize: "1rem",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {card.attributes.field_card_description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Feature;
