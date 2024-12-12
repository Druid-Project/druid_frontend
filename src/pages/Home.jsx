import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData } from "../redux/contentSlice";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import Hero from "../components/homepage/components/Hero";
import ServicesSections from "../components/homepage/components/ServicesSections";
import Feature from "../components/homepage/components/Feature";
import CampaignList from "../campaign/CampaignList";

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.content);

  // Fetch content data when component mounts
  useEffect(() => {
    dispatch(
      fetchContentData({
        endpoint: "node/home",
        includes:
          "field_home_page_sections.field_services_section_cards,field_home_page_sections.field_feature_list",
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
  const homeData = data?.data?.find((item) => item.type === "node--home");

  if (!homeData) {
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
          No data available for the homepage. Please check back later.
        </Typography>
      </Box>
    );
  }

  // Main content
  return (
    <Container disableGutters maxWidth="xl">
      <Hero data={data} />
      <CampaignList />
      <ServicesSections data={data} />
      <Feature data={data} />
    </Container>
  );
};

export default Home;
