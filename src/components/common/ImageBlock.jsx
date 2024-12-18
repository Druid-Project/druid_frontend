import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const ImageBlock = ({ imageUrl, altText }) => (
  <Box p={1}>
    <img
      src={imageUrl}
      alt={altText}
      style={{
        width: "300px",
        height: "200px",
        objectFit: "cover",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    />
  </Box>
);

ImageBlock.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

export default ImageBlock;
