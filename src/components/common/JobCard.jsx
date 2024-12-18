import PropTypes from "prop-types";
import { Card, CardContent, Typography, Button } from "@mui/material";
import DOMPurify from "dompurify";

const JobCard = ({ block }) => {
  const handleClick = () => {
    window.open("https://careers.druid.fi/", "_blank");
  };

  const jobTitle = block.attributes?.field_text?.processed
    ? block.attributes.field_text.processed.split("<p>")[1]?.split("</p>")[0]
    : "Job Title";

  const jobDescription = DOMPurify.sanitize(
    block.attributes?.field_text?.processed || ""
  );

  return (
    <Card
      sx={{
        marginBottom: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        transition: "transform 0.3s",
        textAlign: "center",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            marginBottom: "10px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {jobTitle}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#555",
            marginBottom: "15px",
            lineHeight: "1.6",
          }}
          dangerouslySetInnerHTML={{ __html: jobDescription }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            color: "#000",
            borderRadius: "20px",
            boxShadow: "none",
            backgroundColor: "#fefefe",
            "&:hover": {
              backgroundColor: "#eeeeee",
            },
          }}
          onClick={handleClick}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

JobCard.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    attributes: PropTypes.shape({
      field_text: PropTypes.shape({
        processed: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default JobCard;
