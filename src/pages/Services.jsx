import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData } from "../redux/contentSlice";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import ServicesHero from "../components/servicespage/components/ServicesHero";
import ServiceCardSection from "../components/servicespage/components/ServiceCardSection";
import ConnectCard from "../components/servicespage/components/ConnectCard";

const Services = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.content);
  useEffect(() => {
    dispatch(
      fetchContentData({
        endpoint: "node/services",
        includes:
          "field_services.field_connect_card,field_services,field_services.field_background_image,field_services.field_services_section_cards",
      })
    );
  }, [dispatch, data.services]);
  console.log("Services -> data", data);

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
  const servicesData = data?.data?.find(
    (item) => item.type === "node--services"
  );

  if (!servicesData) {
    return <Typography>No data available.</Typography>;
  }
  return (
    <Container disableGutters maxWidth="xl">
      <Box>
        <ServicesHero data={data} />
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

export default Services;
