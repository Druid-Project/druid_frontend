import React, { useEffect } from "react";
import { fetchImage } from "../../../utils/fetchImage";
import { Box, CardContent, Container, Grid2, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setImageUrl } from "../../../redux/contentSlice";
import CTAButton from "../../common/CTAButton";
import "../css/ServicesHero.css";
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
    <Grid2
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      alignItems="center"
      sx={{
        padding: { xs: "5rem 2rem", md: "10rem 5rem" },
        position: "relative",
        zIndex: 1,
      }}
    >
      <Grid2 item xs={12} md={6}>
        <CardContent sx={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            {hero?.attributes?.field_titile || "Default Title"}
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            {hero?.attributes?.field_description || "Default Description"}
          </Typography>
          {hero?.attributes?.field_cta_button && (
            <CTAButton
              title={hero.attributes.field_cta_button.title}
              url={hero.attributes.field_cta_button.uri}
            />
          )}
        </CardContent>
      </Grid2>
      <Grid2 item xs={12} md={6} size={4}>
        <Box
          component="img"
          src={imageUrl || "default-image.jpg"}
          alt="Services page hero image"
          className="services-hero-image"
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", md: 600 },
            height: "auto",
          }}
        />
      </Grid2>
    </Grid2>
  );
};

export default ServicesHero;
