import React from "react";
import { Card as MuiCard, CardContent, Typography, Box } from "@mui/material";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const Card = ({ content, placeholders }) => {
  let sanitizedContent = DOMPurify.sanitize(content.content);

  // Replace placeholders with actual data
  Object.keys(placeholders).forEach((key) => {
    const regex = new RegExp(`{${key}}`, "g");
    sanitizedContent = sanitizedContent.replace(regex, placeholders[key]);
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitizedContent, "text/html");
  const paragraphs = doc.querySelectorAll("p"); // Extract all <p> elements

  return (
    <MuiCard key={content.id} sx={{ marginBottom: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#3f51b5", textAlign: "center" }}
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

export default Card;
