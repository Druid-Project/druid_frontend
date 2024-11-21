// src/pages/Home.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../redux/homeSlice";
import { Container, Typography, Grid } from "@mui/material"; // Use Grid instead of Grid2
import Hero from "../components/homepage/Hero"; // Import the Hero component
import ServicesSections from "../components/homepage/ServicesSections"; // Import the ServicesSections component
import Feature from "../components/homepage/Feature"; // Import the Feature component

const Home = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.home);

  useEffect(() => {
    if (status === "idle") {
      console.log("Dispatching fetchHomeData");
      dispatch(fetchHomeData());
    }
  }, [dispatch, status]);

  useEffect(() => {
    console.log("Home component status:", status);
    console.log("Home component data:", data);
    console.log("Home component error:", error);
  }, [status, data, error]);

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (status === "failed") {
    return <Typography color="error">Error: {error}</Typography>;
  }

  // Safeguard for cases where data is still null
  if (!data) {
    return <Typography>No data available.</Typography>;
  }

  return (
    <Container style={{ paddingTop: "20px" }}>
      {/* Use Grid container to layout the sections */}
      <Grid container spacing={4}>
        {data?.map((section) => {
          console.log("Rendering section:", section);
          switch (section.type) {
            case "paragraph--hero_section":
              return (
                <Grid item xs={12} sm={6} md={4} key={section.id}>
                  <Hero hero={section} /> {/* Use Hero component */}
                </Grid>
              );
            case "paragraph--blo":
              return (
                <Grid item xs={12} key={section.id}>
                  <ServicesSections section={section} />{" "}
                  {/* Use ServicesSections component */}
                </Grid>
              );
            case "paragraph--feature_section":
              return (
                <Grid item xs={12} key={section.id}>
                  <Feature section={section} /> {/* Use Feature component */}
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
