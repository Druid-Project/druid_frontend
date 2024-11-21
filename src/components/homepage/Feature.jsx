import React from "react";
import { Typography } from "@mui/material";

const Feature = ({ section }) => {
  console.log("Rendering Feature component with section:", section);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {section.attributes.field_section_titile}
      </Typography>
      {/* Add more fields as needed */}
    </div>
  );
};

export default Feature;
