import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import Card from "../common/Card";
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
          <Card
            title={card.attributes.field_card_title}
            description={card.attributes.field_card_title}
            customStyles={{
              flex: 1,
              height: "200px",
              borderRadius: "12px",
              backgroundColor: "#ffoooo",
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            contentStyles={{
              textAlign: "center",
              color: "#1d1d1f",
              fontWeight: "bold",
            }}
          />
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
