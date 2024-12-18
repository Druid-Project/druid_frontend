import PropTypes from "prop-types";
import { Card as MuiCard, CardContent, Typography, Box } from "@mui/material";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const Card = ({ content, placeholders }) => {
  let sanitizedContent = DOMPurify.sanitize(content.content);

  Object.keys(placeholders).forEach((key) => {
    const regex = new RegExp(`{${key}}`, "g");
    sanitizedContent = sanitizedContent.replace(regex, placeholders[key]);
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitizedContent, "text/html");
  const paragraphs = doc.querySelectorAll("p");

  return (
    <MuiCard
      key={content.id}
      sx={{
        marginBottom: 4,
        boxShadow: "none",
        backgroundColor: "transparent",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {content.name}
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          {Array.from(paragraphs).map((paragraph, index) => (
            <Typography key={index} variant="body1" sx={{ marginBottom: 2 }}>
              {parse(paragraph.innerHTML)}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </MuiCard>
  );
};

Card.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  placeholders: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Card;
