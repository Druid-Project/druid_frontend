import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ContactForm = () => (
  <Form>
    <Form.Group controlId="formName" className="mb-3">
      <Form.Control type="text" placeholder="Name" />
    </Form.Group>
    <Form.Group controlId="formEmail" className="mb-3">
      <Form.Control type="email" placeholder="Email" />
    </Form.Group>
    <Form.Group controlId="formPhone" className="mb-3">
      <Form.Control type="text" placeholder="Phone Number" />
    </Form.Group>
    <Button variant="danger" type="submit">Send</Button>
  </Form>
);

export default ContactForm;
