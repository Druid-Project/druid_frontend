import React, { useEffect } from "react";
import { CardContent, Typography, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setImageUrl } from "../../redux/homeSlice";
import { fetchImage } from "../../utils/fetchImage";

const Hero = ({ hero }) => {
  const { baseUrl, imageUrl } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      if (hero.relationships.field_background_image?.data?.id) {
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
        height: "60vh",
        backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        marginBottom: 0, // Remove bottom margin
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
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
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
