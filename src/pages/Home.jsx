import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData } from "../redux/contentSlice";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import Hero from "../components/homepage/Hero";
import ServicesSections from "../components/homepage/ServicesSections";
import Feature from "../components/homepage/Feature";

const Home = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.content);

  useEffect(() => {
    if (status === "idle") {
      dispatch(
        fetchContentData({
          endpoint: "/node/home",
          includes:
            "field_home_page_sections.field_services_section_cards,field_home_page_sections.field_feature_list",
        })
      );
    }
  }, [dispatch, data.home, status]);

  if (status === "loading") {
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

  if (status === "failed") {
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
    <Container>
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
