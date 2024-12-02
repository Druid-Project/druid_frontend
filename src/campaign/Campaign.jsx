import React from "react";
import { Container, Box, Typography, Grid, Button } from "@mui/material";

const Campaign = ({ campaign }) => {
  return (
    <Container sx={{ padding: "1rem 0" }}>
      <Grid
        container
        spacing={0}
        alignItems="center"
        sx={{
          height: "100%",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          position: "relative",
          transition: "box-shadow 0.3s ease, transform 0.3s ease", // Smooth transition for scaling and shadow
          "&:hover": {
            transform: "scale(1.03)", // Slight scale up of the entire card on hover for a smooth effect
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)", // Subtle shadow effect
          },
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ position: "relative", overflow: "hidden" }}
        >
          {campaign.imageUrl && (
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px", // Rounded corners for the image
                transition: "transform 0.3s ease", // Smooth transition for zoom effect
                "&:hover": {
                  transform: "scale(1.1)", // Zoom effect on hover (more subtle than before)
                },
              }}
              src={campaign.imageUrl}
              alt={campaign.title}
            />
          )}
          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
            }}
          >
            {campaign.title}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "1rem",
            backgroundColor: "white",
            height: "100%",
            borderTopLeftRadius: "12px",
            borderBottomLeftRadius: "12px",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              marginBottom: "1rem",
              color: "text.secondary",
              lineHeight: "1.6",
              fontSize: "0.875rem",
            }}
          >
            {campaign.description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "50px",
              fontSize: "0.875rem",
              padding: "0.5rem 1.5rem",
            }}
            onClick={() => (window.location.href = campaign.ctaLink)}
          >
            {campaign.ctaText}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Campaign;
