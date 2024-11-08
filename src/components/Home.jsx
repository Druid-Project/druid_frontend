import React from "react";
import Hero from "./Hero";
import ServicesSections from "./ServicesSections";
import Feature from "./Feature";
import LatestBlogs from "./LatestBlogs";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container fluid>
      <Hero />
      <ServicesSections />
      <Feature />
      <LatestBlogs />
    </Container>
  );
};

export default Home;
