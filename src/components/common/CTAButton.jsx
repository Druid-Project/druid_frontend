import { Button } from "@mui/material";

const CTAButton = ({ uri, title, onClick }) => {
  return (
    <Button
      size="small"
      href={uri}
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
      onClick={onClick}
    >
      {title}
      <span className="arrow-icon">→</span>
    </Button>
  );
};

export default CTAButton;
