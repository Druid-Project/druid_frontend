import React from 'react';
import { Card } from 'react-bootstrap';

const BlogCard = ({ title, excerpt }) => (
  <Card className="border-0">
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{excerpt}</Card.Text>
    </Card.Body>
  </Card>
);

export default BlogCard;
