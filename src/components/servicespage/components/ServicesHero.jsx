import React, { useEffect } from "react";
import { fetchImage } from "../../../utils/fetchImage";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setImageUrl } from "../../../redux/contentSlice";

const ServicesHero = ({ data }) => {
  const hero = data.included?.find(
    (item) => item.type === "paragraph--hero_section"
  );
  const { baseUrl, imageUrl } = useSelector((state) => state.content);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      if (hero?.relationships?.field_background_image?.data?.id) {
        const imageId = hero.relationships.field_background_image.data.id;
        const imageUrl = await fetchImage(imageId, baseUrl);
        if (imageUrl) {
          dispatch(setImageUrl(imageUrl));
        }
      }
    };
    fetchBackgroundImage();
  }, [hero, baseUrl, dispatch]);

  if (!hero || !hero.attributes) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "500px", md: "750px" },
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        margin: 0,
        mb: 10,
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Gradient Overlay for Contrast */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          padding: { xs: "1rem", md: "2rem" },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2.5rem", md: "4.5rem" },
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}
        >
          {hero.attributes.field_titile}
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            fontSize: { xs: "1rem", md: "1.5rem" },
            color: "#e0e0e0",
            marginBottom: "2rem",
            maxWidth: "800px",
            marginX: "auto",
          }}
        >
          {hero.attributes.field_description}
        </Typography>
        {hero.attributes.field_cta_button && (
          <Button
            variant="outlined"
            sx={{
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              borderRadius: "50px",
              borderColor: "#fff",
              color: "#fff",
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderColor: "#fff",
              },
            }}
            onClick={() => {
              const uri = hero.attributes.field_cta_button.uri.replace(
                "internal:",
                ""
              );
              window.location.href = uri;
            }}
          >
            {hero.attributes.field_cta_button.title || "Learn More"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ServicesHero;
