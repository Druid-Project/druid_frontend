import { Typography, Grid } from "@mui/material";
import PropTypes from "prop-types";
import Card from "../../common/Card";
import useFetchCards from "../../../hooks/useFetchCards";
import "../css/servicesSections.css";
import "../../../assets/css/servicesCard.css";

const ServicesSections = ({ data }) => {
  const servicesSection = data.included?.find(
    (item) => item.type === "paragraph--our_services_section"
  );
  const serviceCards = useFetchCards(
    servicesSection,
    "field_services_section_cards"
  );

  if (!servicesSection) return null;

  const renderTitle = (title) => (
    <Typography variant="h4" gutterBottom className="centered-title">
      {title.split(" ").map((word, index) => (
        <span key={index} className={word === "OPEN" ? "highlight" : ""}>
          {word}{" "}
        </span>
      ))}
    </Typography>
  );

  const renderCards = (cards) => (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} key={index}>
          <Card
            imageUrl={card.imageUrl}
            description={card.attributes.field_card_description}
            ctaButton={card.attributes.field_card_cta_button}
            layout="horizontal"
            reverse={index % 2 !== 0}
            customStyles={{
              display: "flex",
              width: "100%",
              boxShadow: "none",
              backgroundColor: "transparent",
            }}
            contentStyles={{ padding: "0 !important" }}
            actionsStyles={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
            variant="services"
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <div className="services-container">
      {renderTitle(servicesSection.attributes.field_title)}
      {renderCards(serviceCards)}
    </div>
  );
};

ServicesSections.propTypes = {
  data: PropTypes.shape({
    included: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        attributes: PropTypes.shape({
          field_title: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
};

export default ServicesSections;
