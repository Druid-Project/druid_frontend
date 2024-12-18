import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const Error = ({ message }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f8d7da",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
    }}
  >
    <Typography variant="h6" color="error">
      {message}
    </Typography>
  </Box>
);

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
