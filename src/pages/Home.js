import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import ServiceCard from '../components/ServiceCard';
import BlogCard from '../components/BlogCard';

const Home = () => (
  <Container>
    <section className="text-center my-5">
      <h1 className="fs-3 fs-md-1">Full service agile software company</h1>
      <p className="lead">We build top quality digital services to help your business grow.</p>
      <Button variant="danger">Read More</Button>
    </section>
    
    {/* Services Section */}
    <section className="my-5">
      <h2 className="text-center mb-4">Our Services</h2>
      <Row>
        <Col xs={12} md={6} lg={3}><ServiceCard title="Discovery Tour" description="A quick start to your project." /></Col>
        <Col xs={12} md={6} lg={3}><ServiceCard title="Digital Design" description="Continuous improvement for user experience." /></Col>
        <Col xs={12} md={6} lg={3}><ServiceCard title="Software Development" description="Robust software solutions." /></Col>
        <Col xs={12} md={6} lg={3}><ServiceCard title="Support & Maintenance" description="Reliable ongoing support." /></Col>
      </Row>
    </section>

    {/* Blog Section */}
    <section className="my-5">
      <h2 className="text-center mb-4">Latest from the Blog</h2>
      <Row>
        <Col xs={12} md={4}><BlogCard title="Drupal 9 is coming" excerpt="Overview of the upgrade process." /></Col>
        <Col xs={12} md={4}><BlogCard title="Progressive Web Apps" excerpt="Benefits of PWAs." /></Col>
        <Col xs={12} md={4}><BlogCard title="Junior Developer Tips" excerpt="Career growth tips." /></Col>
      </Row>
    </section>

    {/* Chat with Me Button */}
    <Button 
      variant="primary" 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        fontSize: '24px',
      }}
      onClick={() => alert('Chat feature coming soon!')}
    >
      💬
    </Button>
  </Container>
);

export default Home;
