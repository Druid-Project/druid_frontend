import React from "react";
import { Container } from "react-bootstrap";
import Hero from "./Hero";
import ServicesSections from "./ServicesSections";
import Feature from "./Feature";
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
