import React from "react";
import Hero from "../components/homepage/Hero";
import ServicesSections from "../components/homepage/ServicesSections";
import Feature from "../components/homepage/Feature";
import { Container } from "@mui/material";
const Home = () => {
  return (
    <div>
      <Container>
        <h1>Welcome to Druid</h1>
        <Hero />
        <ServicesSections />
        <Feature />
      </Container>
    </div>
  );
};

export default Home;
