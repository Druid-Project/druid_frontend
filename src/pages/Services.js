import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ServiceCard from '../components/ServiceCard';

const Services = () => (
  <Container>
    <h1 className="text-center my-5 fs-3 fs-md-1">Our Services</h1>
    <Row>
      <Col xs={12} md={6} lg={3}><ServiceCard title="Discovery Tour" description="Quick project start." /></Col>
      <Col xs={12} md={6} lg={3}><ServiceCard title="Digital Design" description="Enhanced user experience." /></Col>
      <Col xs={12} md={6} lg={3}><ServiceCard title="Software Development" description="Custom web solutions." /></Col>
      <Col xs={12} md={6} lg={3}><ServiceCard title="Support & Maintenance" description="Ongoing support services." /></Col>
    </Row>
  </Container>
);

export default Services;
