import React, { useEffect, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchImage } from "../../utils/fetchImage";
import { filterMatchedHeroes } from "../../utils/mauticUtils";

const Hero = ({ data }) => {
  const heroSections = useMemo(
    () =>
      data.included?.filter(
        (item) => item.type === "paragraph--hero_section"
      ) || [],
    [data.included]
  );

  const { baseUrl } = useSelector((state) => state.content);
  const dispatch = useDispatch();
  const [images, setImages] = React.useState({});
  const [matchedHeroes, setMatchedHeroes] = React.useState([]);

  useEffect(() => {
    const fetchBackgroundImage = async (hero) => {
      const backgroundImageData =
        hero?.relationships?.field_background_image?.data;
      if (backgroundImageData) {
        const imageId = Array.isArray(backgroundImageData)
          ? backgroundImageData[0]?.id
          : backgroundImageData.id;
        if (imageId) {
          const imageUrl = await fetchImage(imageId, baseUrl);
          if (imageUrl) {
            setImages((prevImages) => ({
              ...prevImages,
              [hero.id]: imageUrl,
            }));
          }
        }
      }
    };

    const filterHeroes = async () => {
      const matched = await filterMatchedHeroes(
        heroSections,
        dispatch,
        fetchBackgroundImage
      );
      setMatchedHeroes(matched);
    };

    filterHeroes();
  }, [heroSections, baseUrl, dispatch]);

  if (matchedHeroes.length === 0) {
    return null;
  }

  return (
    <>
      {matchedHeroes.map((hero, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "500px", md: "750px" },
            backgroundImage: `url(${
              images && images[hero.id] ? images[hero.id] : ""
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
            margin: 0,
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
      ))}
    </>
  );
};

export default Hero;
