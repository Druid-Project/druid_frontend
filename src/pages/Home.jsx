import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData } from "../redux/contentSlice";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import Hero from "../components/homepage/components/Hero";
import ServicesSections from "../components/homepage/components/ServicesSections";
import Feature from "../components/homepage/components/Feature";
const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(
      fetchContentData({
        endpoint: "node/home",
        includes:
          "field_home_page_sections.field_services_section_cards,field_home_page_sections.field_feature_list",
      })
    );
  }, [dispatch, data.home]);

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
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }
  const homeData = data?.data?.find((item) => item.type === "node--home");

  if (!homeData) {
    return <Typography>No data available.</Typography>;
  }

  return (
    <Container disableGutters maxWidth="xl">
      <Box>
        <Hero data={data} />
      </Box>
      <Box>
        <ServicesSections data={data} />
      </Box>
      <Box>
        <Feature data={data} />
      </Box>
    </Container>
  );
};

export default Home;
