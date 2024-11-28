import { Button } from "@mui/material";
const CTAButton = (ctaButton) => {
  return (
    <Button
      size="small"
      href={ctaButton.uri}
      variant="contained"
      sx={{
        backgroundColor: "#e13200",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#c12b00",
        },
        display: "flex",
        alignItems: "center",
      }}
    >
      {ctaButton.title}
      <span className="arrow-icon">→</span>
    </Button>
  );
};

export default CTAButton;
