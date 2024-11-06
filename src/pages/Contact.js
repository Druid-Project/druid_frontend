import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ContactForm from '../components/ContactForm';

const Contact = () => (
  <Container>
    <h1 className="text-center my-5 fs-3 fs-md-1">Get in Touch</h1>
    <Row className="g-4">
      <Col xs={12} md={6}>
        <ContactForm />
      </Col>
      <Col xs={12} md={6}>
        <iframe 
          src="https://maps.google.com" 
          title="map" 
          width="100%" 
          height="300" 
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </Col>
    </Row>
  </Container>
);

export default Contact;
