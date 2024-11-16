// src/pages/Home.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../redux/homeSlice";
import { Container, Typography, Grid2 } from "@mui/material"; // Use Grid instead of Grid2
import Hero from "../components/homepage/Hero"; // Import the Hero component

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

  // Safeguard for cases where data is still null
  if (!data) {
    return <Typography>No data available.</Typography>;
  }

  return (
    <Container style={{ paddingTop: "20px" }}>
      {/* Use Grid container to layout the hero sections */}
      <Grid2 container spacing={4}>
        {data?.map((hero) => (
          <Grid2 item xs={12} sm={6} md={4} key={hero.id}>
            <Hero hero={hero} /> {/* Use Hero component */}
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Home;
