import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate  = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/register', {
        name,
        email,
        password,
      });
      console.log(response.data);
      navigate('/login');
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  }

  
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h1 className="text-center mb-4">Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mt-3">
              Sign Up
            </Button>
          </Form>

          <p className='text-center mt-3'><span>OR</span></p>
        <Button variant="dark" onClick={handleLogin} className="w-100 mt-3">
              Already a user ? Login
        </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
