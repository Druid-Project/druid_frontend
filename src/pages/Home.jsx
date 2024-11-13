import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../redux/homeSlice";
import { Button, CircularProgress, Container, Typography } from "@mui/material";
import Hero from "../components/homepage/Hero";

const Home = () => {
  const dispatch = useDispatch();
  const { homeData, heroSection, status, error } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHomeData());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "failed") {
    return (
      <Typography variant="h1" color="error">
        Error: {error}
      </Typography>
    );
  }

  // Get content from homeData and heroSection
  const homeContent = homeData?.data[0]?.attributes;
  const heroContent = heroSection?.data?.attributes;

  return (
    <Container maxWidth="xl">
      {/* Display the Hero Section */}
      {heroContent && <Hero data={heroContent} />}

      {/* Display other home data */}
      <Typography variant="h4">{homeContent?.title}</Typography>
      <Typography variant="body1">
        {homeContent?.field_short_description}
      </Typography>
      <Typography variant="h4" color="initial">
        {homeContent?.field_long_description}
      </Typography>
      <Button variant="contained" color="primary">
        Learn More
      </Button>
      <Button>
        <a
          href={homeContent?.field_cta_link}
          target="_blank"
          rel="noopener
        noreferrer"
        >
          {homeContent?.field_cta_button}
        </a>
      </Button>
      <Typography variant="body1">{homeContent?.field_long_desc}</Typography>
    </Container>
  );
};

export default Home;
