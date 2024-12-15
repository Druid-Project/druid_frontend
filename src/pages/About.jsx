import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData } from "../redux/contentSlice";
import { Container, Box, Typography, Button } from "@mui/material";
import Hero from "../components/common/Hero"; // Import the reusable component
import Feature from "../components/about/Feature";
import ConnectCard from "../components/servicespage/components/ConnectCard";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import useFetchCardDetails from "../hooks/useFetchCardDetails";
import { baseUrl } from "../config";
import ParagraphCard from "../components/homepage/components/ParagraphCard";

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
      (item) =>
        item.type === "paragraph--card" &&
        item.id === "3517aa5f-e382-405e-90a1-0da107113bfb"
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
      <Feature data={data} />
      {paragraphCard && (
        // <ParagraphCard paragraphCard={paragraphCard} />
        <Container disableGutters maxWidth="xl">
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "60vh",
              backgroundImage: `url(${paragraphCard.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              color: "#fff",
            }}
          >
            {/* Background Blur */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backdropFilter: "blur(8px)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1,
              }}
            />

            {/* Content */}
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                padding: "2rem",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                maxWidth: "700px",
                textAlign: "center",
              }}
            >
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
                    borderRadius: "30px",
                    backgroundColor: "#fff",
                    color: "#333",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#ddd",
                    },
                  }}
                >
                  {paragraphCard.attributes.field_card_cta_button.title ||
                    "Learn More"}
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      )}
      <ConnectCard data={data} />
    </Container>
  );
};

export default About;
