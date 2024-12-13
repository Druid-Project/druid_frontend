import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData } from "../redux/contentSlice";
import { Container, Box, Typography } from "@mui/material";
import Hero from "../components/common/Hero";
import ServiceCardSection from "../components/servicespage/components/ServiceCardSection";
import ConnectCard from "../components/servicespage/components/ConnectCard";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";

const About = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(
      fetchContentData({
        endpoint: "node/about",
        includes:
          "field_about_page_sections,field_about_page_sections.field_services_section_cards,field_about_page_sections.field_card_image",
      })
    );
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <Error message={`Error: ${error}`} />;

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

  return (
    <Container disableGutters maxWidth="xl">
      <Box>
        <Hero data={data} />
      </Box>
      <Box>
        <ServiceCardSection data={data} />
      </Box>
      <Box>
        <ConnectCard data={data} />
      </Box>
    </Container>
  );
};

export default About;
