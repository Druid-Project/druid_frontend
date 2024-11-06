import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import BlogCard from '../components/BlogCard';

const Blog = () => (
  <Container>
    <h1 className="text-center my-5 fs-3 fs-md-1">Blog</h1>
    <Row>
      <Col xs={12} md={6} lg={4}><BlogCard title="Junior Developer Tips" excerpt="How to grow your career." /></Col>
      <Col xs={12} md={6} lg={4}><BlogCard title="Why Upgrade to Drupal 9?" excerpt="New version benefits." /></Col>
      <Col xs={12} md={6} lg={4}><BlogCard title="Progressive Web Apps" excerpt="Exploring the advantages of PWAs." /></Col>
    </Row>
    <div className="text-center my-4">
      <Button variant="danger">Load More</Button>
    </div>
  </Container>
);

export default Blog;
