import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ServiceCard = ({ title, description }) => (
  <Card className="text-center border-0">
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <Button variant="danger">Read More</Button>
    </Card.Body>
  </Card>
);

export default ServiceCard;
