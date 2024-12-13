import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData } from "../redux/contentSlice";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import AboutSections from "../components/about/AboutSections";

const About = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.content);

  // Fetch content data when the component mountsgit add .
  useEffect(() => {
    dispatch(
      fetchContentData({
        endpoint: "node/about",
        includes:
          "field_about_page_sections,field_about_page_sections.field_services_section_cards,field_about_page_sections.field_card_image",
      })
    );
  }, [dispatch]);

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error" sx={{ textAlign: "center" }}>
          Something went wrong. <br />
          {error}
        </Typography>
      </Box>
    );
  }

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
          No data available for the About page. Please check back later.
        </Typography>
      </Box>
    );
  }

  // Main content
  return (
    <Container disableGutters maxWidth="xl">
      <Typography variant="h2" sx={{ textAlign: "center", marginBottom: 4 }}>
        About Us
      </Typography>
      <AboutSections data={data} />
    </Container>
  );
};

export default About;
