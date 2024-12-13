import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData } from "../redux/contentSlice";
import { Container, Box, Typography, Button } from "@mui/material";
import Hero from "../components/common/Hero"; // Import the reusable component
import Feature from "../components/homepage/components/Feature";
import ConnectCard from "../components/servicespage/components/ConnectCard";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import useFetchCardDetails from "../hooks/useFetchCardDetails";
import { baseUrl } from "../config";

const About = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.content);
  const [cardId, setCardId] = useState(null);

  // Fetch content data when component mounts
  useEffect(() => {
    dispatch(
      fetchContentData({
        endpoint: "node/about",
        includes:
          "field_about_page_sections,field_about_page_sections.field_background_image,field_about_page_sections.field_visible_to",
      })
    );
  }, [dispatch]);

  // Set card ID
  useEffect(() => {
    const card = data.included?.find(
      (item) => item.type === "paragraph--card" && item.id === "3517aa5f-e382-405e-90a1-0da107113bfb"
    );
    if (card) {
      setCardId(card.id);
    }
  }, [data]);

  // Fetch card details using custom hook
  const paragraphCard = useFetchCardDetails(cardId, baseUrl);

  // Debugging: Log the fetched card details
  useEffect(() => {
    console.log("Fetched paragraph card:", paragraphCard);
  }, [paragraphCard]);

  // Loading state
  if (loading) return <Loading />;

  // Error state
  if (error) return <Error message={`Something went wrong. ${error}`} />;

  // No data available
  const aboutData = data?.data?.find((item) => item.type === "node--about");

  if (!aboutData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          No data available for the about page. Please check back later.
        </Typography>
      </Box>
    );
  }

  // Extract hero section from included data
  const heroSection = data.included?.find(
    (item) => item.type === "paragraph--hero_section"
  );

  // Main content
  return (
    <Container disableGutters maxWidth="xl">
      {heroSection && <Hero data={{ included: [heroSection] }} />}
      {paragraphCard && (
        <Box sx={{ margin: "2rem 0", alignItems: "center", display:"flex", flexDirection:"column-reverse" }}>
          {paragraphCard.imageUrl && (
            <Box
              component="img"
              src={paragraphCard.imageUrl}
              alt={paragraphCard.attributes.field_card_title}
              sx={{
                width: "100%",
                maxWidth: "700px",
                height: "auto",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                marginBottom: "1rem",
              }}
            />
            
            
          )
          
          }
          <Typography variant="h4" gutterBottom>
            {paragraphCard.attributes.field_card_title}
          </Typography>
          <Typography variant="body1" paragraph>
            {paragraphCard.attributes.field_card_description}
          </Typography>
          {paragraphCard.attributes.field_card_cta_button && (
            <Button
              variant="contained"
              href={paragraphCard.attributes.field_card_cta_button.uri.replace(
                "internal:",
                ""
              )}
              sx={{
                marginTop: "1rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "50px",
                backgroundColor: "#0071e3",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#005bb5",
                },
              }}
            >
              {paragraphCard.attributes.field_card_cta_button.title || "Learn More"}
            </Button>
          )}
        </Box>
      )}
      <Feature data={data} />
      <ConnectCard data={data} />
    </Container>
  );
};

export default About;
