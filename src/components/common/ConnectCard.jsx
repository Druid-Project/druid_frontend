import PropTypes from "prop-types";
import { Container, Grid, Typography, Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import useFetchCardDetails from "../../hooks/useFetchCardDetails";
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

  const { field_card_description, field_card_title, field_card_cta_button } =
    connectCard.attributes;

  const descriptionLines = field_card_description.split("\n").slice(0, 3);
  const email = field_card_description.split("\n")[3]?.trim();
  const phone = field_card_description.split("\n")[4]?.trim();

  const handleButtonClick = (event) => {
    event.preventDefault();
    const uri = field_card_cta_button.uri.replace("internal:", "");
    navigate(uri);
  };

  return (
    <Container sx={{ padding: "2rem 0", textAlign: "left" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            {field_card_title}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
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
            {field_card_cta_button.title}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

ConnectCard.propTypes = {
  data: PropTypes.shape({
    included: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        relationships: PropTypes.shape({
          field_connect_card: PropTypes.shape({
            data: PropTypes.shape({
              id: PropTypes.string,
            }),
          }),
        }),
      })
    ),
  }).isRequired,
};

export default ConnectCard;
