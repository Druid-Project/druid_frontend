import { Container, Grid, Typography, Box, Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import useFetchCardDetails from "../../../hooks/useFetchCardDetails";
import { useNavigate } from "react-router-dom";
const ConnectCard = ({ data }) => {
  const navigate = useNavigate();
  const connectSection = data.included?.find(
    (item) => item.type === "paragraph--connect_with_us"
  );
  const connectCardId =
    connectSection?.relationships.field_connect_card.data.id;
  const connectCard = useFetchCardDetails(connectCardId);

  if (!connectCard) return null;

  const descriptionLines = [
    connectCard.attributes.field_card_description.split("\n")[0], // Address line 1
    connectCard.attributes.field_card_description.split("\n")[1], // Address line 2
    connectCard.attributes.field_card_description.split("\n")[2], // Country
  ];

  const email = connectCard.attributes.field_card_description
    .split("\n")[3]
    ?.trim();

  const phone = connectCard.attributes.field_card_description
    .split("\n")[4]
    ?.trim();

  const handleButtonClick = (event) => {
    event.preventDefault();
    const uri = connectCard.attributes.field_card_cta_button.uri.replace(
      "internal:",
      ""
    );
    navigate(uri);
  };
  return (
    <Container sx={{ padding: "2rem 0", textAlign: "left", display: "flex" }}>
      <Grid sx={{ flex: "4" }}>
        <Typography variant="h4" gutterBottom>
          {connectCard.attributes.field_card_title}
        </Typography>
      </Grid>
      <Grid sx={{ flex: "1" }}>
        {descriptionLines.map((line, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{
              marginBottom: "0.5rem",
              lineHeight: "1.6",
              fontSize: "1rem",
              color: "text.secondary",
            }}
          >
            {line}
          </Typography>
        ))}
      </Grid>
      <Grid sx={{ flex: "1" }}>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "0.5rem",
            lineHeight: "1.6",
            fontSize: "1rem",
            color: "text.secondary",
          }}
        >
          {email}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "0.5rem",
            lineHeight: "1.6",
            fontSize: "1rem",
            color: "text.secondary",
          }}
        >
          {phone}
        </Typography>

        <Button
          onClick={handleButtonClick}
          sx={{
            color: "#202020",
            textTransform: "capitalize",
          }}
        >
          <ArrowRightAltIcon sx={{ color: "#cf2e2e" }} />{" "}
          {connectCard.attributes.field_card_cta_button.title}
        </Button>
      </Grid>
    </Container>
  );
};

export default ConnectCard;
