// src/pages/Home.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../redux/homeSlice";
import { Container, Typography, Grid } from "@mui/material";
import Hero from "../components/homepage/Hero";
import ServicesSections from "../components/homepage/ServicesSections";
import Feature from "../components/homepage/Feature";

const Home = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.home);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHomeData());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (status === "failed") {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!data) {
    return <Typography>No data available.</Typography>;
  }

  return (
    <Container style={{ paddingTop: "20px" }}>
      <Grid container spacing={4}>
        {data?.included?.map((section) => {
          switch (section.type) {
            case "paragraph--hero_section":
              return (
                <Grid item xs={12} sm={12} md={12} key={section.id}>
                  <Hero hero={section} />
                </Grid>
              );
            case "paragraph--our_services_section":
              return (
                <Grid item xs={12} key={section.id}>
                  <ServicesSections section={section} />
                </Grid>
              );
            case "paragraph--feature_section":
              return (
                <Grid item xs={12} key={section.id}>
                  <Feature section={section} />
                </Grid>
              );
            default:
              return null;
          }
        })}
      </Grid>
    </Container>
  );
};

export default Home;
