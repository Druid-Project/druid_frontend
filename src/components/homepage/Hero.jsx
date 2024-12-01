import React, { useEffect } from "react";
import { CardContent, Typography, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setImageUrl } from "../../redux/contentSlice";
import { fetchImage } from "../../utils/fetchImage";

const Hero = ({ data }) => {
  const hero = data.included?.find(
    (item) => item.type === "paragraph--hero_section"
  );
  const { baseUrl, imageUrl } = useSelector((state) => state.content);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      if (hero?.relationships?.field_background_image?.data?.id) {
        const imageId = hero.relationships.field_background_image.data.id;
        console.log("Background image ID:", imageId);
        const imageUrl = await fetchImage(imageId, baseUrl);
        if (imageUrl) {
          dispatch(setImageUrl(imageUrl));
          console.log("backgroundImageUrl:", imageUrl);
        }
      }
    };

    fetchBackgroundImage();
  }, [hero, baseUrl, dispatch]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        maxWidth: "100%",
        height: "80vh",
        backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        mb: 4,
        overflow: "hidden",
        p: 0,
        m: 0,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <CardContent sx={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
          {hero.attributes.field_titile}
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          {hero.attributes.field_description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href={hero.attributes.field_cta_button?.uri || "#"}
          sx={{ padding: "10px 20px", fontSize: "16px" }}
        >
          {hero.attributes.field_cta_button?.title || "Learn More"}
        </Button>
      </CardContent>
    </Box>
  );
};

export default Hero;
